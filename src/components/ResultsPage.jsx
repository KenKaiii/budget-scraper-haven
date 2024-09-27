import React from 'react';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const ResultsPage = ({ results, onBack }) => {
  const handleDownload = () => {
    // TODO: Implement CSV download functionality
    console.log('Downloading results as CSV');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Extracted Information</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Timeline</TableHead>
            <TableHead>Source</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.projectName}</TableCell>
              <TableCell>{result.budget}</TableCell>
              <TableCell>{result.description}</TableCell>
              <TableCell>{result.timeline}</TableCell>
              <TableCell>{result.source}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-between">
        <Button onClick={onBack}>Back to Home</Button>
        <Button onClick={handleDownload}>Download Results</Button>
      </div>
    </div>
  );
};

export default ResultsPage;