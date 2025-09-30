import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import "@solana/wallet-adapter-react-ui/styles.css";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletWrapper } from './Components/WalletWrapper';


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
