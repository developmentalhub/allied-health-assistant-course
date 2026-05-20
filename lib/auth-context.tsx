"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

// Define the shape of your profile
interface Profile {
  role: string | null;
}

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

    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      const { session } = data;
      
      if (session?.user) {
        setUser(session.user);
        // Explicitly define the type for the response here
        supabase.from("profiles").select("role").eq("id", session.user.id).single().then(({ data: profileData }: { data: Profile | null }) => {
          setRole(profileData?.role || "parent");
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          setUser(session.user);
          supabase.from("profiles").select("role").eq("id", session.user.id).single().then(({ data: profileData }: { data: Profile | null }) => {
            setRole(profileData?.role || "parent");
          });
        } else {
          setUser(null);
          setRole(null);
        }
      }
    );

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