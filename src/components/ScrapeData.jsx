import React, { useState } from 'react';
import axios from 'axios';

const ScrapeData = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = '3dda27f5851f49a0908082bd607a75cf43130a33861';

  const handleScrape = async () => {
    setError(null);
    setData(null);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.scrape.do/?api_key=${apiKey}&url=${encodeURIComponent(url)}`
      );
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data. Please check the URL or try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Council Budget Scraper</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter council website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleScrape}
        disabled={isLoading}
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Scraping...' : 'Scrape Budget Data'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {isLoading && <p className="text-gray-600 mt-4">Loading...</p>}

      {data && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Scraped Data</h2>
          <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-700">{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrapeData;