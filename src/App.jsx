import React from 'react';
import { SupabaseAuthProvider, SupabaseAuthUI, useSupabaseAuth } from './integrations/supabase/auth';
import ScrapedArticles from './components/ScrapedArticles';

const AppContent = () => {
  const { session, logout } = useSupabaseAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Council Budget Scraper</h1>
          {session ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          ) : (
            <SupabaseAuthUI />
          )}
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {session ? (
          <ScrapedArticles />
        ) : (
          <div className="text-center mt-8">
            <p className="text-xl">Please log in to view and scrape articles.</p>
          </div>
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <SupabaseAuthProvider>
      <AppContent />
    </SupabaseAuthProvider>
  );
}

export default App;