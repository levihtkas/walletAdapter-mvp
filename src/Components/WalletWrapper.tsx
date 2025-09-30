import { RequestAirdrop } from './index';
import { ShowBalance } from './Balances';
import SendTransaction from './sendTransaction';
import { WalletModalProvider,WalletConnectButton,WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import type { PublicKey } from '@solana/web3.js';
import SignMessage from './SignMessage';


export function WalletWrapper(){
  const[key,setKey] = useState<PublicKey|null>();
  const wallet = useWallet()
  useEffect(()=>{
    console.log(`Key ${wallet.publicKey?.toBase58()}`)
    setKey(wallet!.publicKey)
  },[wallet.publicKey])

  useEffect(()=>{
    const provider = (window as any).solana;
    if (!provider.isPhantom) return
    function handleChanged(newPublicKey: PublicKey | null){
      console.log(`Public Key ${newPublicKey}`) 
      setKey(newPublicKey)
    }
    provider.on('accountChanged',handleChanged)
  },[])
  return (
    <div className='bg-slate-200 h-screen w-screen'>
      <div className='flex justify-center p-2 '>
      <h1 className='text-2xl bg-gradient-to-r from-red-400 via-yellow-500 to-blue-600 bg-clip-text text-transparent font-bold'>SOL Wallet Adapter</h1>

      </div>
      <div className='flex flex-col gap-5 justify-center items-center'>
                <RequestAirdrop/>
                <div>Connected to {key?.toString()}</div>
                <SignMessage/>
                <ShowBalance/>
                <SendTransaction/>
                <WalletMultiButton />
                <WalletDisconnectButton />
          </div>
    </div>
  )
}