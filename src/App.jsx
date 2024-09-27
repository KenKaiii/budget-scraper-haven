import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';
import { extractInformation } from './utils/PDFExtractor';

function App() {
  const [results, setResults] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExtract = async (state) => {
    setIsLoading(true);
    setError(null);
    try {
      const extractedData = await extractInformation(state);
      setResults(extractedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setResults(null);
    setSelectedState('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {results ? (
        <ResultsPage results={results} onBack={handleBack} />
      ) : (
        <HomePage 
          onExtract={handleExtract} 
          selectedState={selectedState} 
          setSelectedState={setSelectedState}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
}

export default App;