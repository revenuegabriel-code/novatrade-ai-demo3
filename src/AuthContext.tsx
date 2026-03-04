import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, UserProfile } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: UserProfile | null;
  loading: boolean;
  signInWithMock: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session
    const initAuth = async () => {
      if (import.meta.env.VITE_SUPABASE_URL) {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        if (session) {
          // Fetch profile (mock for now if table doesn't exist)
          setUser({
            id: session.user.id,
            email: session.user.email!,
            subscription_tier: 'pro',
            license_key: 'EA-8821-9932-1102'
          });
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const signInWithMock = () => {
    // Mock login for demo purposes
    const mockUser: UserProfile = {
      id: 'mock-user-id',
      email: 'alex@novatrade.ai',
      subscription_tier: 'pro',
      license_key: 'EA-8821-9932-1102'
    };
    setUser(mockUser);
    setSession({
      access_token: 'mock-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh',
      user: {
        id: mockUser.id,
        aud: 'authenticated',
        role: 'authenticated',
        email: mockUser.email,
        app_metadata: {
          subscription_tier: 'pro'
        },
        user_metadata: {
          full_name: 'Alex Trader'
        },
        created_at: new Date().toISOString(),
      }
    });
  };

  const signOut = async () => {
    if (import.meta.env.VITE_SUPABASE_URL) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signInWithMock, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
