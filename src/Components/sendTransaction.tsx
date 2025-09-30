import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useRef } from "react";
import InputBox from "../UI/inputBox";

export default function SendTransaction(){
  const toRef = useRef<HTMLInputElement|null>(null);
  const amountRef = useRef<HTMLInputElement|null>(null);
  const wallet= useWallet();
  const {connection} = useConnection();

  async function sendT() {
    try{
      const transaction = new Transaction();
    if(wallet.publicKey===null){
      return
    }
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet!.publicKey,
        toPubkey: new PublicKey(toRef.current!.value),
        lamports: parseInt(amountRef.current!.value) * LAMPORTS_PER_SOL
      })
    )
    await wallet.sendTransaction(transaction,connection)
    alert(`Send transation ${toRef.current?.value}`)
    } catch (e){
      console.log(e)
    }
    
  }
  return (<div>
    <div>
      <InputBox placeholder={"Whom to send the sols"} ref={toRef} />
      <InputBox placeholder="How much u want to send" ref={amountRef} />
      <button onClick={sendT} className="p-2 bg-red-200 rounded-lg">Send</button>
    </div>

  </div>)
}