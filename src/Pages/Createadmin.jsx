import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Components/Footer'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Context from '../Context/Context';

const Createadmin = ({margin}) => {
    const value = useContext(Context)
    const [status, setStatus] = useState()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm()
    const onSubmit = async (data) => {

        let res = await axios.post('https://z-care.onrender.com/createadmin', data, {
            withCredentials: true,
        })
        let message = res.data.message;
        let status = res.data.status;
        setStatus(status)
        if (status) {
            toast.success(message)
        } else {
            toast.error(message)
        }

    }
    useEffect(() => {



    }, [status])

    return (
        <div style={{marginTop:margin}} className={`w-[400px] mx-auto pt-[100px] text-center border ${window.innerWidth<410 && 'w-[90%] mx-auto'}`}>
            <ToastContainer />
            <h1 className='font-bold text-[23px]'>Create New Admin</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='w-[100%] mt-[30px] flex flex-col '>
                <input required {...register('email')} type="email" name='email' placeholder='Email' className='outline-none bg-white border border-gray-500 w-full rounded-lg px-[20px] py-[5px] ' />
                <input required {...register('password')} type="password" name='password' placeholder='Password' className='outline-none bg-white border border-gray-500 w-full rounded-lg px-[20px] py-[5px] my-[20px]' />
                <div className='flex justify-end text-gray-500 text-[13px] mt-[5px] mb-[20px]'>
                </div>

                <input type="submit" value="Create" className='border rounded-lg cursor-pointer bg-gradient-to-tr from-white via-black to-white text-white w-fit mx-auto px-[10px] py-[5px]' />
            </form>

        </div>
    )
}

export default Createadmin