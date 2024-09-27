import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, yearFilter, setYearFilter, budgetFilter, setBudgetFilter }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search council..."
        className="flex-grow p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="number"
        placeholder="Filter by year..."
        className="p-2 border rounded"
        value={yearFilter}
        onChange={(e) => setYearFilter(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min budget (millions)..."
        className="p-2 border rounded"
        value={budgetFilter}
        onChange={(e) => setBudgetFilter(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;