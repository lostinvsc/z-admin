import React,{useState , useEffect} from 'react'
import Context from './Context/Context.js'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Update from './Pages/Update.jsx'
import Navbar from './Components/Navbar.jsx'

import Login from './Pages/Login.jsx'
import Appointments from './Pages/Appointments.jsx'

import Cookies from 'js-cookie'
import Messages from './Pages/Messages.jsx'
import Createadmin from './Pages/Createadmin.jsx'
const App = () => {
  const [cookie, setCookie] = useState()
const [margin, setMargin] = useState(0)
  useEffect(() => {
let value=Cookies.get("adminToken")
setCookie(value)
  },[])

 
  const router=createBrowserRouter([
    {
      path:'/',
      element:<div className='relative overflow-hidden bg-gray-200 min-h-screen max-w-[1500px] mx-auto'><Navbar margin={margin} setMargin={setMargin}/> <Appointments  setMargin={setMargin} margin={margin} /></div>
    },
    {
      path:'/login',
      element:<div className='relative w-[100vw] overflow-hidden bg-gray-200 min-h-screen max-w-[1500px] mx-auto'><Navbar margin={margin} setMargin={setMargin}/> <Login  margin={margin}/></div>
    },

    {
      path:'/messages',
      element:<div className='relative overflow-hidden bg-gray-200 min-h-screen max-w-[1500px] mx-auto'><Navbar margin={margin} setMargin={setMargin}/> <Messages margin={margin}/></div>
    },
    {
      path:'/update',
      element:<div className='relative overflow-hidden bg-gray-200 min-h-screen max-w-[1500px] mx-auto'><Navbar margin={margin} setMargin={setMargin}/><Update margin={margin}/></div>
    },
    {
      path:'/createadmin',
      element:<div className='relative overflow-hidden bg-gray-200 min-h-screen max-w-[1500px] mx-auto'><Navbar margin={margin} setMargin={setMargin}/><Createadmin  margin={margin}/></div>
    },

  ])
  return (
  
    <>
    <Context.Provider value={{cookie:cookie ,setCookie}}>
      <RouterProvider router={router} />
    </Context.Provider>
    </>

  )
}

export default App