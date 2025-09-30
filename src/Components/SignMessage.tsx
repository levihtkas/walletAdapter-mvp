import { ed25519 } from "@noble/curves/ed25519.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRef } from "react";
import InputBox from "../UI/inputBox";


export default function SignMessage(){
  const messageRef  = useRef<HTMLInputElement>(null);
  const wallet = useWallet()
  async function signClick(){
    if(!messageRef.current || !wallet.signMessage || !wallet.publicKey){
      return
    }
    const message = messageRef.current.value;
    const textM = new TextEncoder().encode(message)
    const signature =await wallet.signMessage(textM)
    console.log(`SIgnature ${signature}`)
    try{
      if(!ed25519.verify(signature,textM,wallet.publicKey.toBytes())){
        console.log('not verified')
      } else {
        alert("verified")
      }
    } catch (e){
      alert(e)
    }
   
  }
  return (<div>
    <input ref={messageRef}/>
    <InputBox placeholder={"Enter the message"} ref={messageRef} />
    <button onClick={signClick}>Submit</button>
  </div>)
}