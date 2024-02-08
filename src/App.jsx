import { useState,useCallback, useEffect, useRef } from "react"

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] =  useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")
  const passwordRef = useRef(null)

  //For Optimization
  const passGenerator = useCallback(() => {
    let pass = ''
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += '0123456789'
    if(charAllowed) str += '!@#$%^&*-_+=[]{}~`'

    for (let index = 1; index <= length; index++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass +=str.charAt(char) 
    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  //useRef for password selection effect
  const copyPassword =  useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 999)
      window.navigator.clipboard.writeText(password)
  },[password])

  
  useEffect(() => {
    passGenerator()
  },[length,charAllowed,numberAllowed,passGenerator])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            value={password}
            ref={passwordRef}
          
        />
        <button
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        onClick={copyPassword}
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
          type="range"
          min={6}
          max={100}
          className='cursor-pointer'
          onChange={(e) => setLength(e.target.value)}
          value={length}
        
        />
      <label>Lenght ({length})</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          value={numberAllowed}
          id="numberInput"
          onClick={() => setNumberAllowed((prev) => !prev)}
        
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              value={charAllowed}
              id="characterInput"
              onClick={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
</div>
    </>
  )
}

export default App
