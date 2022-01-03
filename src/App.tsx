import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  useParams,
} from "react-router-dom";
import NavBar from './components/utils/NavBar';

function App() {
  return (
    <Router>
      <NavBar/>
    </Router>
  );
}

export default App;
