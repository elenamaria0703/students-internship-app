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
import InternshipsRootComponent from "./components/offers/InternshipsRootComponent";

function App() {
  return (
    <Router>
      <AccountProvider>
        <NavBar/>
        <InternshipsRootComponent/>
        {/* This component is just for testing purposes. */}
        {/*<UserAuthTestComponent/>*/}
      </AccountProvider>
    </Router>
  );
}

export default App;
