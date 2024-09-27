import React from 'react';
import { Button } from './ui/button';

const ResultsPage = ({ results, onBack }) => {
  const handleDownload = () => {
    // TODO: Implement CSV download functionality
    console.log('Downloading results as CSV');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Extracted Information</h2>
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4 whitespace-pre-wrap">
        <code>
          {results.map((project, index) => (
            `Project ${index + 1}:
Name: ${project.projectName || 'N/A'}
Budget: ${project.budget || 'N/A'}
Total Estimated Cost: ${project.totalEstimatedCost || 'N/A'}
Location: ${project.statisticalArea || 'N/A'}

`
          )).join('\n')}
        </code>
      </pre>
      <div className="flex justify-between">
        <Button onClick={onBack}>Back to Home</Button>
        <Button onClick={handleDownload}>Download Results</Button>
      </div>
    </div>
  );
};

export default ResultsPage;