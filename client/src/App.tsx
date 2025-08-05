import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <Navbar/>
    <div className='p-4'>
      <Outlet/>
    </div>
    </>
  )
}

export default App
