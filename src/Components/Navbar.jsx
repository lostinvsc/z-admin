import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import logo from '/logo.png'
import axios from 'axios'
import '../Css/Navbar.css'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = (props) => {
   
    const ref = useRef()
    

    return (

        <nav ref={ref} id='nav' className='flex justify-between flex-wrap items-center absolute top-0 bg-transparent z-30 '>

            <div className=''>
                <img id='logo' src={logo} className='' alt="" />
            </div>

            <div>
                <ul id='cpart' className='flex items-center justify-between font-light hide'>
                    <li className='cursor-pointer'>
                        <NavLink className={(e) => { if (e.isActive) { return 'text-red-600' } }} to='/'>Appointments</NavLink>
                    </li>
                    <li className='cursor-pointer'>
                        <NavLink className={(e) => { if (e.isActive) { return 'text-red-600' } }} to='/messages'>Messages</NavLink>
                    </li>
                    <li className='cursor-pointer'>
                        <NavLink className={(e) => { if (e.isActive) { return 'text-red-600' } }} to='/update'>Update</NavLink>
                    </li>
                </ul>
            </div>

            

            <img onClick={() => {
                let cpart = document.getElementById('cpart')
                cpart.classList.toggle('hide')
                let logintext = document.getElementById('logintext')
                logintext.classList.toggle('hide2')
                if (window.innerWidth < 750 && window.innerWidth >= 312) {
                    props.setMargin(100)
                } else if (window.innerWidth < 312) {
                    props.setMargin(160)
                }
            }} className='scale-[1.3] cursor-pointer menu' src="/mennu.svg" alt="" />



        </nav>
    )
}

export default Navbar