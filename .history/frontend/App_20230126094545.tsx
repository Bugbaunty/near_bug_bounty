import 'regenerator-runtime/runtime';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Header from './Components/Header';
import Chathome from './Components/Chathome';
import Chat from "./Components/Chat";
import Tournament from './Pages/Tournament';
import "./App.css";
import CreateTournament from './Pages/CreateTournament';
import AllTournaments from './Components/AllTournaments';
import TournamentView from './Pages/TournamentView';

interface Props {
  isSignedIn: any,
  wallet: any,
  gamebloc: any
}

const App = ({ isSignedIn, wallet, gamebloc }: Props) => {
  
  // gamebloc.new(accountID).then((e) => console.log(e)
  // );

  return (
    <Router>
      <>
        <Header
          isSignedIn={isSignedIn}
          wallet={wallet}
          gamebloc={gamebloc} />
      </>
      <div className="app">
        <Dashboard isSignedIn={isSignedIn} wallet={wallet} />
        <Routes>
          <Route path="/" element={<Home  gamebloc={gamebloc} isSignedIn={isSignedIn}/>} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/all-tournaments" element={<AllTournaments gamebloc={gamebloc} isSignedIn={isSignedIn} />} />
          <Route path="/tournament/:id" element={<CreateTournament gamebloc={gamebloc} />} />
          <Route path="/tournament-view/:id" element={<TournamentView />} />
        </Routes>

        <Chathome isSignedIn={isSignedIn} gamebloc={gamebloc} />
      </div>
    </Router>
  );
};

export default App;


