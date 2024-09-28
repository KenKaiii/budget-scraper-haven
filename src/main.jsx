import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Error rendering the app:', error);
    rootElement.innerHTML = '<p>An error occurred while loading the application. Please try refreshing the page.</p>';
  }
} else {
  console.error('Root element not found');
  document.body.innerHTML = '<p>Unable to load the application. The root element is missing.</p>';
}