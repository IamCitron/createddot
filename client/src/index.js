import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PrayerContextProvider } from './context/PrayerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrayerContextProvider>
      <App />
    </PrayerContextProvider>
  </React.StrictMode>
);
