import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Journal from './pages/Journal';
import MoodTracker from './pages/MoodTracker';
import Crisis from './pages/Crisis';
import Wellness from './pages/Wellness';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/tracker" element={<MoodTracker />} />
          <Route path="/crisis" element={<Crisis />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;