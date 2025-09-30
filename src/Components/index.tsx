import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useRef } from "react";
import InputBox from "../UI/inputBox";

export function RequestAirdrop(){
  const wallet = useWallet();
  const {connection} = useConnection();
  const inputRef = useRef<HTMLInputElement | null>(null)

   async function requestAirdrop(){
    try{
      const raw = inputRef.current?.value;

   // Convert to number
    const amount = raw ? Number(raw) : null;

    console.log(amount)


    if(amount===null || Number.isNaN(amount)){
      alert(`Invalid Input ${amount}`)
      inputRef.current!.value = '';
      return
    } else if(wallet.publicKey===null){
      alert(`Invalid PublicKey ${amount}`)
      return
    }

    const signature = await connection.requestAirdrop(wallet!.publicKey,amount*LAMPORTS_PER_SOL)
    await connection.confirmTransaction(signature,'finalized')
    alert(`Done & Dusted check ${signature}`) 
    } catch (e){
      console.log(e)
    }
    
   }

   return (<div>
    <div className="p-2">
      <InputBox placeholder={"Enter the sol you wanted to Airdrop"} ref={inputRef} />
      <button className="m-2 p-2 bg-red-200 hover:bg-red-400" onClick={requestAirdrop}>Drop it</button>
    </div>

   </div>)
}