import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CouncilCard from '../components/CouncilCard';
import SearchBar from '../components/SearchBar';
import { fetchCouncils } from '../services/api';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');

  const { data: councils, isLoading, error } = useQuery({
    queryKey: ['councils'],
    queryFn: fetchCouncils,
  });

  const filteredCouncils = councils?.filter(council => 
    council.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (yearFilter === '' || council.year === parseInt(yearFilter)) &&
    (budgetFilter === '' || council.budget >= parseFloat(budgetFilter))
  );

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Council Budget Dashboard</h1>
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        budgetFilter={budgetFilter}
        setBudgetFilter={setBudgetFilter}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredCouncils?.map(council => (
          <CouncilCard key={council.id} council={council} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;