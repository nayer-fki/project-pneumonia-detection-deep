import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Predict from './pages/Predict';
import LearnMore from './pages/LearnMore';
import ViewDataset from './pages/ViewDataset';
import ModelDetails from './pages/ModelDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/view-dataset" element={<ViewDataset />} />
        <Route path="/model-details" element={<ModelDetails />} />
      </Routes>
    </Router>
  );
}

export default App;