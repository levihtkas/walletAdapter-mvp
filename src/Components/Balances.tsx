import { useConnection,useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function ShowBalance(){
  const {connection} = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState<Number | string>("Loading");

  useEffect(()=>{
    getBalance()
    console.log("Called toa ction")
  },[wallet.publicKey])
  async function getBalance(){
    if(wallet.publicKey){
       setBalance(await connection.getBalance(wallet.publicKey)/LAMPORTS_PER_SOL);
    }
  }
  useEffect(() => {
    console.log("Wallet changed:", wallet.publicKey?.toBase58());
  }, [wallet.publicKey]);

  return <div>
    <div>
   
    Balance : {balance.toString()}
    </div>
    
  </div>
}