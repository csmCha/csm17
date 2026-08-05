import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { error } = await supabase.from('users').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: 'User deleted successfully' });
}
