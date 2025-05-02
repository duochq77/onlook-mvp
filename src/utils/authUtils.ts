import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getUserProfile() {
  const { data, error } = await supabase.from('profiles').select('*')
  if (error) throw error
  return data
}

// ✅ Bổ sung signIn để tránh lỗi build ở LoginPage.tsx
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}
