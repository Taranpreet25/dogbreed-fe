import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
import  BreedList  from './components/BreedList';
import  BreedDetails  from './components/BreedDetails';
import  Favorites  from './components/Favorites';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BreedList />} />
        <Route path="/breeds/:breedName" element={<BreedDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
