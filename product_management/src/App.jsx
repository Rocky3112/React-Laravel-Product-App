import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="p-5 grid grid-cols-3 gap-4">
      
      <div className="border rounded p-3 shadow">
        <h2 className="text-xl font-bold">Product Name</h2>
        <p className="text-gray-600">$100</p>
      </div>

    </div>
    </>
  )
}

export default App
