import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Context from '../Context/Context'
import logo from '/logo.png'
import axios from 'axios'
import '../Css/Navbar.css'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = (props) => {
    const navigate = useNavigate();
    let value = useContext(Context);
    const ref = useRef()
    async function logout() {
        let con = confirm("Are you sure you want to logout")
        if (con) {
            let res = await axios.get('https://z-back-1.onrender.com/adminlogout', {
                withCredentials: true,
            })

            if (res.data.status) {
                toast.success(res.data.message)
                value.setCookie(Cookies.get("adminToken"))
            } else {
                toast.error(res.data.message)
            }
        }
    }

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

            <div id='logintext' className={`h-fit px-[15px] py-[5px]  box-border hide2 ${window.innerWidth > 450 ? 'logintext' : ''}`}>
                {
                    !value.cookie ?
                        <span>
                            <Link to='/login' className='cursor-pointer'>Login</Link>
                        </span>

                        :
                        <div className='flex items-center gap-[20px]'>
                            <Link to='/createadmin' className='cursor-pointer'>Create Admin</Link>
                            <button onClick={() => { logout() }} className='cursor-pointer'>Logout</button>
                        </div>
                }
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