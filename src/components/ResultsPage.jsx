import React, { useState } from 'react';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';

const ResultsPage = ({ results, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedResults = React.useMemo(() => {
    let sortableResults = [...results];
    if (sortConfig.key !== null) {
      sortableResults.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableResults;
  }, [results, sortConfig]);

  const filteredResults = sortedResults.filter(project =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Extracted Project Information</h2>
      <Input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('projectName')} className="cursor-pointer">Project Name</TableHead>
            <TableHead onClick={() => handleSort('budget')} className="cursor-pointer">Budget</TableHead>
            <TableHead onClick={() => handleSort('timeline')} className="cursor-pointer">Timeline</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredResults.map((project, index) => (
            <TableRow key={index}>
              <TableCell>{project.projectName || 'N/A'}</TableCell>
              <TableCell>{project.budget || 'N/A'}</TableCell>
              <TableCell>{project.timeline || 'N/A'}</TableCell>
              <TableCell>{project.details || 'No additional details available.'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-6">
        <Button onClick={onBack}>Back to Home</Button>
        <Button onClick={handleDownload}>Download Results (CSV)</Button>
      </div>
    </div>
  );
};

export default ResultsPage;