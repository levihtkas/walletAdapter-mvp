import React from 'react'

interface inputProps {
  placeholder:string,
  ref: React.RefObject<HTMLInputElement|null>;

}
const inputBox = (props:inputProps) => {
  return (
    <div className='inline-block m-2'>
      <input className='w-full p-2 m-2' placeholder={props.placeholder} ref={props.ref}/>
    </div>
  )
}

export default inputBox