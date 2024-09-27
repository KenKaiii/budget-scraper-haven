import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

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

const HomePage = ({ onExtract, selectedState, setSelectedState, selectedInfoType, setSelectedInfoType, isLoading, error }) => {
  const handleExtract = () => {
    if (selectedState && selectedInfoType) {
      onExtract(selectedState, selectedInfoType);
    }
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
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default HomePage;