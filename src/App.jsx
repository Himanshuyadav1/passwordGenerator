import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [specialChar, setSpecialChar] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const passwordRef = useRef(null);
  
  
  // Optimizing(memoized) the function using useCallback 
  const passwordGenrator = useCallback(() => {

    // code for generating password
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let speChar = '~!@#$%^&*()_{}[]';
    let num = '0123456789';
    let pos;
    let pass = '';
    if(specialChar) str += speChar;
    if(numbers) str += num;
    
    for(let i = 0; i < length; i++ ) {
      pos = Math.floor(Math.random() * str.length);
      pass = pass + str.charAt(pos);
    }
    
    setPassword(pass);
  }, [length, specialChar, numbers, setPassword]);

  useEffect(() => {
    passwordGenrator();
  }, [length, specialChar, numbers, passwordGenrator]);
  
  const copyPassword = useCallback(() => {
    // For showing the selected copy password
    passwordRef.current.select();
    // Copy to clipboard
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div>
      <h1>Password Generator</h1>
      <div className="input-group mb-3">
        <input type="text" className="form-control" value={password} readOnly={true} ref={passwordRef} />
        <button className="btn btn-primary" type="button" id="copy" onClick={copyPassword}>Copy</button>        
      </div>
      <div className="input-group mb-3">
        <div className="form-check">
          <input type="range" className="form-range" min="5" max="25" id="length" value={length} onChange={(e) => setLength(e.target.value)} />
          <label htmlFor="length" className="form-label">Length {length} </label>
        </div>
        <div className="form-check mx-2">
          <input className="form-check-input" type="checkbox" value="" id="speChar" onChange={() => setSpecialChar(prev => !prev)} />
          <label className="form-check-label" htmlFor="speChar">
            Special Chars
          </label>          
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="num" onChange={() => setNumbers(prev => !prev)} />
          <label className="form-check-label" htmlFor="num">
            Numbers
          </label>  
        </div>        
      </div>
    </div>
  )
}

export default App
