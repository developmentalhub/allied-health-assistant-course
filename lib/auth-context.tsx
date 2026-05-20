"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

type AuthContextType = { 
  user: User | null; 
  role: string | null; 
  loading: boolean; 
  signOut: () => Promise<void> 
};

const AuthContext = createContext<AuthContextType>({ 
  user: null, role: null, loading: true, signOut: async () => {} 
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Initial check: Explicitly type the destructured session
    supabase.auth.getSession().then(async ({ data: { session } }: { data: { session: Session | null } }) => {
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
        setRole(profile?.role || "parent");
      }
      setLoading(false);
    });

    // Subscription: Explicitly type event and session
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
        setRole(profile?.role || "parent");
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.reload();
  }

  return <AuthContext.Provider value={{ user, role, loading, signOut }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);