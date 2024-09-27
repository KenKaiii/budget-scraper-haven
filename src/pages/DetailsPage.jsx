import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCouncilDetails } from '../services/api';

const DetailsPage = () => {
  const { id } = useParams();
  const { data: council, isLoading, error } = useQuery({
    queryKey: ['council', id],
    queryFn: () => fetchCouncilDetails(id),
  });

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">{council.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Project Description</h2>
          <p className="text-gray-700">{council.projectDescription}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Funding Source</h2>
          <p className="text-gray-700">{council.fundingSource}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Budget Breakdown</h2>
        <ul className="list-disc ml-8 text-gray-700">
          {council.budgetBreakdown.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Key Highlights</h2>
        <ul className="list-disc ml-8 text-gray-700">
          {council.keyHighlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailsPage;