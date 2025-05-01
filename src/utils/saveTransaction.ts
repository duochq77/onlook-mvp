import { supabase } from './authUtils';

export async function saveTransaction(transaction: {
  buyer_id: string;
  product_id: string;
  livestream_id: string;
  quantity: number;
  price: number;
}) {
  const { data, error } = await supabase
    .from('transactions')
    .insert([transaction]);

  return { data, error };
}
