// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// NEAR
import { GameBloc } from './near-interface';
import { Wallet } from './near-wallet';
import { UserProvider } from './Context/UserContext';

// When creating the wallet you can choose to create an access key, so the user
// can skip signing non-payable methods when talking wth the  contract
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME })

// Abstract the logic of interacting with the contract to simplify your flow
export const gamebloc = new GameBloc({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });

const root = ReactDOM.createRoot(document.getElementById('root'));
// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp()
  if (isSignedIn) {
    // await gamebloc.initializeContract(localStorage.getItem("near_app_wallet_auth_key"));
   }
  root.render(
    <React.StrictMode>
      <UserProvider>
        <App isSignedIn={isSignedIn} wallet={wallet} gamebloc={gamebloc} />
      </UserProvider>
    </React.StrictMode>
  );
}