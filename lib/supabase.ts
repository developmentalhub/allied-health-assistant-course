import { createBrowserClient } from '@supabase/ssr'

// Singleton — prevents re-creating the client on every render,
// which breaks onAuthStateChange listeners
let client: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (client) return client
  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  return client
}

// Named export for backward compatibility with existing files
export const supabase = createClient()