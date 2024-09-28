import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { extractInformation } from '../utils/PDFExtractor';
import Notification from './Notification';
import { Loader2 } from 'lucide-react';

const australianStates = ['Queensland'];

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
        setError(err.message || 'An error occurred during extraction. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please select both a state and an information type.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Queensland Budget Information Extractor</h1>
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
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
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Extracting...
            </>
          ) : (
            'Extract Information'
          )}
        </Button>
      </div>
      {error && (
        <Notification 
          message={error} 
          type="error"
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
};

export default HomePage;