import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Training from './pages/Training';
import Nutrition from './pages/Nutrition';
import Profile from './pages/Profile';
import CoachChat from './pages/CoachChat';
import CoachPanel from './pages/CoachPanel';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/training" element={<Training />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/coach" element={<CoachPanel />} />
          <Route path="/coach/chat" element={<CoachChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
