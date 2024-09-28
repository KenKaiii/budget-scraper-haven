import React from 'react';
import HomePage from './components/HomePage';

function App() {
  console.log('App component is rendering');
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <HomePage />
    </div>
  );
}

export default App;