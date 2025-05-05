// File: lib/serverTransaction.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function saveTransaction(data: {
  room: string;
  identity: string;
  action: 'start' | 'end';
}) {
  const { error } = await supabase.from('transactions').insert([
    {
      room: data.room,
      identity: data.identity,
      action: data.action,
      timestamp: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error('❌ Failed to save transaction:', error.message);
    return false;
  }

  console.log('✅ Transaction saved successfully.');
  return true;
}
