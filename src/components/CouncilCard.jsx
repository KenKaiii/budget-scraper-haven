import React from 'react';
import { Link } from 'react-router-dom';

const CouncilCard = ({ council }) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{council.name}</h2>
      <p className="text-gray-600">Budget: ${council.budget.toLocaleString()} million</p>
      <p className="text-gray-600 mb-4">Year: {council.year}</p>
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700">Quick Facts:</h3>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {council.quickFacts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      </div>
      <Link 
        to={`/council/${council.id}`}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded inline-block hover:bg-blue-600 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default CouncilCard;