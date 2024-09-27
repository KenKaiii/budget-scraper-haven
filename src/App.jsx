import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';
import { extractInformation } from './utils/PDFExtractor';

function App() {
  const [results, setResults] = useState(null);

  const handleExtract = async (files, keywords) => {
    const extractedData = await extractInformation(files, keywords);
    setResults(extractedData);
  };

  const handleBack = () => {
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {results ? (
        <ResultsPage results={results} onBack={handleBack} />
      ) : (
        <HomePage onExtract={handleExtract} />
      )}
    </div>
  );
}

export default App;