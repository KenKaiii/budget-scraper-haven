import { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from './supabase.js';
import { useNavigate } from 'react-router-dom';

const customTheme = {
  default: {
    colors: {
      brand: '#2563eb',
      brandAccent: '#1d4ed8',
      inputBackground: 'white',
      inputBorder: '#e2e8f0',
      inputText: '#1e293b',
      inputLabelText: '#64748b',
    },
    space: {
      inputPadding: '1rem',
      buttonPadding: '1rem',
    },
    borderWidths: {
      buttonBorderWidth: '0px',
      inputBorderWidth: '0px 0px 2px 0px',
    },
    radii: {
      borderRadiusButton: '0.375rem',
      buttonBorderRadius: '0.375rem',
      inputBorderRadius: '0.375rem',
    },
    fontSizes: {
      baseInputSize: '1rem',
      baseButtonSize: '1rem',
    },
    fonts: {
      bodyFontFamily: `'Roboto', sans-serif`,
      buttonFontFamily: `'Roboto', sans-serif`,
      inputFontFamily: `'Roboto', sans-serif`,
    },
  },
};

export const SupabaseAuthUI = () => {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa, ...customTheme }}
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'bytebuzzsite@gmail.com',
        password: '123123',
      });
      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in as guest:', error.message);
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