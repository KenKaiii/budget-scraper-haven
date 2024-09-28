import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import axios from 'axios';

const ResultsPage = ({ results, onBack }) => {
  const [formattedResults, setFormattedResults] = useState('');
  const [displayedProjects, setDisplayedProjects] = useState(20);

  useEffect(() => {
    formatResults();
  }, [results, displayedProjects]);

  const formatResults = async () => {
    const projectsToFormat = results.slice(0, displayedProjects);
    const prompt = `Format the following project data neatly:
${JSON.stringify(projectsToFormat, null, 2)}
Please provide a clean, readable format for each project, including all relevant information.`;

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      setFormattedResults(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error formatting results:', error);
      setFormattedResults('Error formatting results. Please check your API key and try again.');
    }
  };

  const handleLoadMore = () => {
    setDisplayedProjects(prev => Math.min(prev + 20, results.length));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Extracted Project Information</h2>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
        {formattedResults}
      </pre>
      {displayedProjects < results.length && (
        <Button onClick={handleLoadMore} className="mt-4">Load More</Button>
      )}
      <Button onClick={onBack} className="mt-4 ml-4">Back to Home</Button>
    </div>
  );
};

export default ResultsPage;