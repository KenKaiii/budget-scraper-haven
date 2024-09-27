import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseAuthProvider, SupabaseAuthUI, GuestLoginButton, useSupabaseAuth } from './integrations/supabase/auth';
import ScrapedArticles from './components/ScrapedArticles';
import { FaFileInvoiceDollar } from 'react-icons/fa';

const queryClient = new QueryClient();

const AppContent = () => {
  const { session, logout } = useSupabaseAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {session ? (
          <div className="bg-white shadow-xl rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Council Budget Scraper</h1>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              >
                Logout
              </button>
            </div>
            <ScrapedArticles />
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-lg p-8">
            <div className="text-center mb-8">
              <FaFileInvoiceDollar className="mx-auto h-12 w-12 text-blue-500" />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Council Budget Scraper</h2>
            </div>
            <SupabaseAuthUI />
            <GuestLoginButton />
            <p className="mt-6 text-center text-sm text-gray-500">
              &copy; 2023 Council Budget Scraper. All rights reserved.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthProvider>
        <AppContent />
      </SupabaseAuthProvider>
    </QueryClientProvider>
  );
}

export default App;