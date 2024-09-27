import React from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const australianStates = [
  'Queensland',
  'New South Wales',
  'Victoria',
  'Northern Territory',
  'Western Australia',
  'South Australia',
];

const HomePage = ({ onExtract, selectedState, setSelectedState, isLoading, error }) => {
  const handleExtract = () => {
    if (selectedState) {
      onExtract(selectedState);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Infrastructure Budget Information Extractor</h1>
      <div className="mb-6">
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
      <Button onClick={handleExtract} disabled={!selectedState || isLoading} className="w-full">
        {isLoading ? 'Extracting...' : 'Extract Information'}
      </Button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default HomePage;