import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { extractInformation } from '../utils/PDFExtractor';
import Notification from './Notification';

const australianStates = [
  'Queensland',
  'New South Wales',
  'Victoria',
  'Northern Territory',
  'Western Australia',
  'South Australia',
];

const informationTypes = [
  'Healthcare Projects',
  'Roads and Transport',
  'Education Projects',
  'Environmental Projects',
  'Public Safety Projects',
  'Other Infrastructure Projects',
];

const HomePage = ({ onExtract }) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedInfoType, setSelectedInfoType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExtract = async () => {
    if (selectedState && selectedInfoType) {
      setIsLoading(true);
      setError(null);
      try {
        const results = await extractInformation(selectedState, selectedInfoType);
        onExtract(results);
      } catch (err) {
        console.error('Extraction error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const copyErrorToClipboard = () => {
    navigator.clipboard.writeText(error);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Comprehensive Infrastructure Budget Information Extractor</h1>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select a state</label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {australianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select information type</label>
          <Select value={selectedInfoType} onValueChange={setSelectedInfoType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select information type" />
            </SelectTrigger>
            <SelectContent>
              {informationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={handleExtract} 
          disabled={!selectedState || !selectedInfoType || isLoading} 
          className="w-full"
        >
          {isLoading ? 'Extracting...' : 'Extract Information'}
        </Button>
      </div>
      {error && (
        <Notification 
          message={error} 
          type="error"
          onClose={() => setError(null)}
          action={
            <Button onClick={copyErrorToClipboard} variant="outline" size="sm">
              Copy Error
            </Button>
          }
        />
      )}
    </div>
  );
};

export default HomePage;