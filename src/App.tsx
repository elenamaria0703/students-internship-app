import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  useParams,
} from "react-router-dom";
import NavBar from './components/utils/NavBar';
import AccountProvider from './providers/AccountProvider';
import UserAuthTestComponent from './components/auth/UserAuthTestComponent';
import InternshipsRootComponent from "./components/internships/InternshipsRootComponent";
import {InternshipProvider} from "./providers/InternshipProvider";

function App() {
  return (
    <Router>
      <AccountProvider>
        <InternshipProvider>
          <NavBar/>
          <InternshipsRootComponent/>
        </InternshipProvider>
      </AccountProvider>
    </Router>
  );
}

export default App;
