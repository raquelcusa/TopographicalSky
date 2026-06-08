import React, { useState } from 'react';
import IntroView from './pages/IntroView';
import DashboardView from './pages/DashboardView';
import './index.css';

export default function App() {
  const [view, setView] = useState('intro');

  return (
    <div className="app-wrapper">
      {view === 'intro' ? (
        <IntroView onStart={() => setView('dashboard')} />
      ) : (
        <DashboardView onBack={() => setView('intro')} />
      )}
    </div>
  );
}