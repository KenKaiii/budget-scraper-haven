import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const HomePage = ({ onExtract }) => {
  const [files, setFiles] = useState([]);
  const [keywords, setKeywords] = useState('');

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleExtract = () => {
    onExtract(files, keywords);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Infrastructure Budget Information Extractor</h1>
      <div className="mb-6">
        <Label htmlFor="file-upload" className="block mb-2">Upload PDF Documents</Label>
        <Input id="file-upload" type="file" multiple onChange={handleFileChange} accept=".pdf" />
      </div>
      <div className="mb-6">
        <Label htmlFor="keywords" className="block mb-2">Search Keywords</Label>
        <Input
          id="keywords"
          type="text"
          placeholder="e.g., Mount Isa, road, infrastructure"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>
      <Button onClick={handleExtract} className="w-full">Extract Information</Button>
    </div>
  );
};

export default HomePage;