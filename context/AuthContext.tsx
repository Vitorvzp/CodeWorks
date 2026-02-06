import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// Cookie helper functions
const setCookie = (name: string, value: string, days: number = 30) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
};

const getCookie = (name: string): string | null => {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
};

const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored session in cookies
        const storedAccessToken = getCookie('sb-access-token');
        const storedRefreshToken = getCookie('sb-refresh-token');

        const initSession = async () => {
            // Try to restore session from cookies
            if (storedAccessToken && storedRefreshToken) {
                const { data, error } = await supabase.auth.setSession({
                    access_token: storedAccessToken,
                    refresh_token: storedRefreshToken,
                });

                if (!error && data.session) {
                    setSession(data.session);
                    setUser(data.session.user);
                    // Update cookies with fresh tokens
                    setCookie('sb-access-token', data.session.access_token);
                    setCookie('sb-refresh-token', data.session.refresh_token);
                } else {
                    // Clear invalid cookies
                    deleteCookie('sb-access-token');
                    deleteCookie('sb-refresh-token');
                }
            } else {
                // Get session from Supabase
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    setSession(session);
                    setUser(session.user);
                    // Store tokens in cookies
                    setCookie('sb-access-token', session.access_token);
                    setCookie('sb-refresh-token', session.refresh_token);
                }
            }
            setLoading(false);
        };

        initSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session) {
                // Store tokens in cookies
                setCookie('sb-access-token', session.access_token);
                setCookie('sb-refresh-token', session.refresh_token);
            } else {
                // Clear cookies on logout
                deleteCookie('sb-access-token');
                deleteCookie('sb-refresh-token');
            }

            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (!error && data.session) {
            // Store JWT in cookies
            setCookie('sb-access-token', data.session.access_token);
            setCookie('sb-refresh-token', data.session.refresh_token);
        }

        return { error };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        // Clear cookies
        deleteCookie('sb-access-token');
        deleteCookie('sb-refresh-token');
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
