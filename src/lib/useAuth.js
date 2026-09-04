import { useEffect, useState, useCallback } from "react";
import { supabase } from "./supabaseClient";

const AUTH_TIMEOUT_MS = 8000;

export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return undefined;
    }
    let settled = false;
    const timeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        setLoading(false);
      }
    }, AUTH_TIMEOUT_MS);

    supabase.auth.getSession().then(({ data }) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => {
      clearTimeout(timeout);
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email, password) => {
    if (!supabase) return { error: { message: "Backend not configured." } };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  return { session, user: session?.user || null, loading, signIn, signOut };
}

export default useAuth;
