import React, { useState } from 'react';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const ResultsPage = ({ results, onBack }) => {
  const [sortBy, setSortBy] = useState('projectName');
  const [filterTerm, setFilterTerm] = useState('');

  const handleDownload = () => {
    // TODO: Implement CSV download functionality
    console.log('Downloading results as CSV');
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'budget' || sortBy === 'totalEstimatedCost') {
      return parseFloat(a[sortBy].replace(/[^0-9.-]+/g, "")) - parseFloat(b[sortBy].replace(/[^0-9.-]+/g, ""));
    }
    return a[sortBy].localeCompare(b[sortBy]);
  });

  const filteredResults = sortedResults.filter(result =>
    result.projectName.toLowerCase().includes(filterTerm.toLowerCase()) ||
    result.statisticalArea.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Extracted Information</h2>
      <div className="mb-4 flex gap-4">
        <Input
          placeholder="Filter projects..."
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="projectName">Project Name</SelectItem>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="totalEstimatedCost">Total Estimated Cost</SelectItem>
            <SelectItem value="statisticalArea">Statistical Area</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Total Estimated Cost</TableHead>
            <TableHead>Statistical Area</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredResults.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.projectName}</TableCell>
              <TableCell>{result.budget}</TableCell>
              <TableCell>{result.totalEstimatedCost}</TableCell>
              <TableCell>{result.statisticalArea}</TableCell>
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