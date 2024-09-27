import React, { useState } from 'react';
import { useBudgetArticles, useAddBudgetArticle } from '../integrations/supabase';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import axios from 'axios';
import * as cheerio from 'cheerio';

const SCRAPE_DO_API_KEY = '3dda27f5851f49a0908082bd607a75cf43130a33861';

const ScrapedArticles = () => {
  const { session } = useSupabaseAuth();
  const { data: articles, isLoading, error } = useBudgetArticles();
  const addArticleMutation = useAddBudgetArticle();
  const [scrapingUrl, setScrapingUrl] = useState('');

  const scrapeArticle = async (url) => {
    try {
      const response = await axios.get(`https://api.scrape.do/?api_key=${SCRAPE_DO_API_KEY}&url=${encodeURIComponent(url)}`);
      const html = response.data;
      const $ = cheerio.load(html);
      
      const title = $('h1').first().text() || 'No title found';
      const content = $('p').text() || 'No content found';

      const newArticle = {
        title,
        link: url,
        publication_date: new Date().toISOString(),
        content,
        user_id: session?.user?.id
      };

      await addArticleMutation.mutateAsync(newArticle);
    } catch (error) {
      console.error('Error scraping article:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    scrapeArticle(scrapingUrl);
    setScrapingUrl('');
  };

  if (isLoading) return <div className="text-center mt-8">Loading articles...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Scraped Council Budget Articles</h1>
      
      {session ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="url"
            value={scrapingUrl}
            onChange={(e) => setScrapingUrl(e.target.value)}
            placeholder="Enter URL to scrape"
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Scrape Article
          </button>
        </form>
      ) : (
        <p className="mb-4 text-red-500">Please log in to scrape articles.</p>
      )}

      {articles?.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul className="space-y-4">
          {articles?.map((article) => (
            <li key={article.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-500">Published on: {new Date(article.publication_date).toLocaleDateString()}</p>
              <p className="mt-2">{article.content.substring(0, 200)}...</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScrapedArticles;