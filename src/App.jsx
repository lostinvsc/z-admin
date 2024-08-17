import React,{useState , useEffect} from 'react'

import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Update from './Pages/Update.jsx'
import Navbar from './Components/Navbar.jsx'

import Appointments from './Pages/Appointments.jsx'

import Messages from './Pages/Messages.jsx'


const App = () => {

const [backurl, setBackurl] = useState("http://localhost:3000")

const [margin, setMargin] = useState(0)


 
  const router=createBrowserRouter([
    {
      path:'/',
      element:<div className='relative overflow-hidden bg-gray-200 min-h-screen max-w-[1500px] mx-auto'><Navbar margin={margin} setMargin={setMargin}/> <Appointments  setMargin={setMargin} margin={margin} /></div>
    },

    {
      path:'/messages',
      element:<div className='relative overflow-hidden bg-gray-200 min-h-screen max-w-[1500px] mx-auto'><Navbar margin={margin} setMargin={setMargin}/> <Messages margin={margin}/></div>
    },
    {
      path:'/update',
      element:<div className='relative overflow-hidden bg-gray-200 min-h-screen max-w-[1500px] mx-auto'><Navbar margin={margin} setMargin={setMargin}/><Update margin={margin}/></div>
    },

  ])
  return (
  
    <>

      <RouterProvider router={router} />

    </>

  )
}

export default App