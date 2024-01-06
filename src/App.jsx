import {useCallback, useState, useEffect, useRef} from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [password, setPassword] = useState("");

  //using Userefrence to copy the passwords
  const passRef = useRef(null);

  const generatePass = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      str += "0123456789";
    }

    if (symbol) {
      str += "@$&-_";
    }

    for (let i=0; i<length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);
    }

    setPassword(pass);
    console.log(pass);
  }
  , [length, number, symbol, setPassword]);

  const copyPassword = useCallback(() => {
    passRef.current?.select(); // to highlight the selected part
    passRef.current?.setSelectionRange(0, 13); // to set the range 
    window.navigator.clipboard.writeText(password); // to copy the password
  }, [password])

  useEffect( () => {
    generatePass();
  } ,[generatePass, number, length, symbol]);

  return (
    <>
      <h3 className="text-center mt-2 text-xl font-serif text-fuchsia-50">Generate Password</h3>
      <div className="w-1/2 h-48 bg-purple-300 mt-4 mx-auto rounded px-7 py-5">
        <div>
          <input 
            type="text" 
            className="h-12 w-3/4 ml-9 outline-none p-5 " 
            readOnly
            value={password}
            ref={passRef}
          />

          <button 
            onClick={copyPassword}
            className=" font-serif bg-purple-950 h-12 w-20 text-fuchsia-50 ">Copy</button>
        </div>
        
        <input 
          type="range" 
          className="mt-9 ml-12 font-serif cursor-pointer"
          min={5}
          max={13 }
          value={length}
          onChange={ (event) => {
            setLength(event.target.value)
          }} 
        />
        <label className="text-xl font-serif text-fuchsia-950 mr-10"> Length:({length })</label>

        <input 
          type="checkbox"
          defaultChecked={number}
          id='numInp'
          onChange={ () => {
            setNumber((prev) => !prev)
          }} 
        />
        <label className='font-serif text-xl text-fuchsia-950 mr-11'> Numbers</label>

        <input 
          type="checkbox"
          defaultChecked={symbol}
          id='symInp'
          onChange={ () => {
            setSymbol( (prev) => !prev)
          }}
        />
        <label className='font-serif text-xl text-fuchsia-950'> Symbols</label>
      </div>
    </>
  )
}

export default App
