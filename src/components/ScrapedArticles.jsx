import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SCRAPE_DO_API_KEY = '3dda27f5851f49a0908082bd607a75cf43130a33861'; // Replace with your actual API key
const KEYWORDS = ['Council budget', 'budget announcement'];

const ScrapedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const scrapeArticles = async (url) => {
    try {
      const response = await axios.get(`https://api.scrape.do/?api_key=${SCRAPE_DO_API_KEY}&url=${encodeURIComponent(url)}`);
      const html = response.data;
      
      // Here we would normally use Cheerio to parse the HTML and extract relevant information
      // For now, we'll just simulate finding articles based on keywords
      const simulatedArticles = KEYWORDS.flatMap(keyword => 
        html.toLowerCase().includes(keyword.toLowerCase()) 
          ? [{ title: `Article about ${keyword}`, link: url, publicationDate: new Date().toISOString() }] 
          : []
      );

      return simulatedArticles;
    } catch (error) {
      console.error('Error scraping articles:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real scenario, you would have a list of URLs to scrape
        const urls = ['https://example-council-website.com/news'];
        const scrapedArticles = await Promise.all(urls.map(scrapeArticles));
        setArticles(scrapedArticles.flat());
      } catch (error) {
        setError('Failed to fetch articles. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) return <div className="text-center mt-8">Loading articles...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Scraped Council Budget Articles</h1>
      {articles.length === 0 ? (
        <p>No relevant articles found.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article, index) => (
            <li key={index} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-500">Published on: {new Date(article.publicationDate).toLocaleDateString()}</p>
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