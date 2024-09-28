import React from 'react';
import { Button } from './ui/button';

const ResultsPage = ({ results, onBack }) => {
  const handleDownload = () => {
    const csv = [
      ['Project Name', 'Budget', 'Timeline', 'Details'],
      ...results.map(project => [
        project.projectName || 'N/A',
        project.budget || 'N/A',
        project.timeline || 'N/A',
        project.details || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'extracted_projects.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Extracted Project Information</h2>
      <div className="space-y-6">
        {results.map((project, index) => (
          <div key={index} className="bg-white p-4 rounded-md shadow">
            <h3 className="text-xl font-semibold mb-2">{project.projectName || 'Unnamed Project'}</h3>
            <p><strong>Budget:</strong> {project.budget || 'N/A'}</p>
            <p><strong>Timeline:</strong> {project.timeline || 'N/A'}</p>
            <p><strong>Details:</strong> {project.details || 'No additional details available.'}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <Button onClick={onBack}>Back to Home</Button>
        <Button onClick={handleDownload}>Download Results (CSV)</Button>
      </div>
    </div>
  );
};

export default ResultsPage;