import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrapedArticles from './components/ScrapedArticles';
import { FaFileInvoiceDollar } from 'react-icons/fa';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="bg-white shadow-xl rounded-lg p-8">
              <div className="text-center mb-8">
                <FaFileInvoiceDollar className="mx-auto h-12 w-12 text-blue-500" />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Council Budget Scraper</h2>
              </div>
              <ScrapedArticles />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;