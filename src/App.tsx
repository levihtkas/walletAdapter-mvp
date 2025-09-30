import { useState,useMemo } from 'react'
import { ConnectionProvider,useWallet,WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider,WalletConnectButton,WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletWrapper } from './Components/WalletWrapper';

import { useEffect } from 'react';

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const clusterUrl =  clusterApiUrl(network);


  return (
    <>
    <ConnectionProvider endpoint={clusterUrl}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletWrapper/>
        </WalletModalProvider>

      </WalletProvider>

    </ConnectionProvider>
    </>
  )
}

export default App
