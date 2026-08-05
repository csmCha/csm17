-- Run this once in Supabase Dashboard > SQL Editor.
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_date date not null,
  status text not null default 'open' check (status in ('open', 'closed', 'published')),
  people_per_table integer not null default 4 check (people_per_table between 3 and 5),
  created_at timestamptz not null default now()
);

-- Meetup settings managed by the super admin.
alter table public.events add column if not exists start_time time;
alter table public.events add column if not exists location text;
alter table public.events add column if not exists max_guests integer check (max_guests is null or max_guests > 0);
alter table public.events add column if not exists signup_deadline timestamptz;

create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  nickname text not null check (char_length(nickname) between 1 and 20),
  gender text not null check (gender in ('female', 'male', 'other', 'no_answer')),
  is_staff boolean not null default false,
  created_at timestamptz not null default now(),
  unique(event_id, nickname)
);

-- Operational fields: retain check-in, cancellation, and final seating history.
alter table public.participants add column if not exists attendance_status text not null default 'registered'
  check (attendance_status in ('registered', 'checked_in', 'cancelled'));
alter table public.participants add column if not exists table_number integer check (table_number is null or table_number > 0);
alter table public.participants add column if not exists assigned_at timestamptz;

alter table public.events enable row level security;
alter table public.participants enable row level security;

-- Anyone can see the current meetup and submit themselves; only authenticated organizers can manage data.
create policy "events are publicly readable" on public.events for select using (true);
create policy "participants are publicly readable" on public.participants for select using (true);
create policy "public may register" on public.participants for insert with check (is_staff = false);
create policy "organizers manage events" on public.events for all to authenticated using (true) with check (true);
create policy "organizers manage participants" on public.participants for all to authenticated using (true) with check (true);

-- Create the first event after signing in as an organizer.
-- insert into public.events (title, event_date, people_per_table) values ('LTE Friday Meetup', '2026-08-07', 4);

-- Role-based access for the separate /admin screen.
-- New Auth users start as participants. A super admin promotes them to staff in the app.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role text not null default 'participant' check (role in ('super_admin', 'staff', 'participant')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.get_event_guest_count(target_event uuid)
returns bigint language sql security definer set search_path = public as $$
  select count(*) from public.participants where event_id = target_event and is_staff = false and attendance_status <> 'cancelled';
$$;

alter table public.profiles enable row level security;
drop policy if exists "participants are publicly readable" on public.participants;
drop policy if exists "organizers manage participants" on public.participants;
drop policy if exists "organizers manage events" on public.events;

create policy "staff can view participants" on public.participants for select to authenticated using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('super_admin', 'staff'))
);
create policy "staff can update participants" on public.participants for update to authenticated using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('super_admin', 'staff'))
) with check (true);
create policy "super admins manage events" on public.events for all to authenticated using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin')
) with check (true);
create policy "users can view their profile" on public.profiles for select to authenticated using (id = auth.uid());
create policy "super admins view profiles" on public.profiles for select to authenticated using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin')
);
create policy "super admins update profiles" on public.profiles for update to authenticated using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin')
) with check (true);

-- After creating your first Auth user in Supabase Dashboard, run this once:
-- update public.profiles set role = 'super_admin' where email = 'your-email@example.com';
