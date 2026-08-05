# LTE Table Maker

A Vercel + Supabase web app for Let’s Talk in English meetups. Guests submit a nickname and gender; organizers mark one staff member per table and receive balanced table suggestions.

## Set up Supabase

1. Create a Supabase project and run [`supabase/schema.sql`](./supabase/schema.sql) in its SQL Editor.
2. In **Authentication → Providers**, enable Email. Create organizer accounts in **Authentication → Users**.
3. Copy `.env.example` to `.env.local` and fill in the project URL, anon key, and service-role key (Settings → API). Keep the service-role key server-only; never prefix it with `NEXT_PUBLIC_`.
4. Create the first `events` row using the final SQL example in `schema.sql`.

## Run and deploy

```bash
npm run dev
```

Push this folder to GitHub, import it in Vercel, and add the same three environment variables under **Settings → Environment Variables**. Vercel will build it automatically.

## Table rules

- Set `people_per_table` to 3–5. Each table then has 4–6 people after one organizer is assigned.
- Mark one participant per table as staff. The automatic layout gives every table one staff member where enough staff exist.
- Remaining attendees are spread by gender and table size to minimize concentration.
