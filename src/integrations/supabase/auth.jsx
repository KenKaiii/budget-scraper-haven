import { useState, useEffect, createContext, useContext } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from './supabase.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const SupabaseAuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const value = {
    session,
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useSupabaseAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};

export const SupabaseAuthUI = () => {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="default"
      providers={[]}
    />
  );
};

export const GuestLoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'bytebuzzsite@gmail.com',
        password: '123123',
      });
      if (error) throw error;
      if (data.user) {
        // If the user was created successfully, sign them in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: 'bytebuzzsite@gmail.com',
          password: '123123',
        });
        if (signInError) throw signInError;
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in as guest:', error.message);
      // If the user already exists, try to sign in
      if (error.message.includes('User already registered')) {
        try {
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: 'bytebuzzsite@gmail.com',
            password: '123123',
          });
          if (signInError) throw signInError;
          navigate('/dashboard');
        } catch (signInError) {
          console.error('Error signing in as existing guest:', signInError.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGuestLogin}
      disabled={isLoading}
      className="w-full py-3 px-4 mt-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {isLoading ? 'Loading...' : 'Continue as Guest'}
    </button>
  );
};