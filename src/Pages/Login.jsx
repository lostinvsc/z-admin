import React,{useEffect , useState , useContext} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Components/Footer'
import { useForm } from 'react-hook-form';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Context from '../Context/Context';

const Login = ({margin}) => {
    const value=useContext(Context)
    const [status, setStatus] = useState()
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm()
    const onSubmit = async (data) => {

            let res = await axios.post('https://z-back-1.onrender.com/adminLogin', data, {
                withCredentials: true,
            })
            let message = res.data.message ; 
            let status = res.data.status ; 
            console.log(status,message)
            setStatus(status)
            if(status){
                navigate('/')
                value.setCookie(Cookies.get("adminToken"))
            }else{
                toast.error(message)
            }
      
    }
    useEffect(() => {
   
    

    }, [status])
    
    return (
        <div tyle={{marginTop:margin}} className={`w-[400px] mx-auto mt-[100px] text-center border ${window.innerWidth<410 && 'w-[90%] mx-auto'}`}>
       
            <h1 className='font-bold text-[23px]'>Admin's Sign In</h1>
            <p className='text-gray-500 text-[14px] my-[15px]'>Please Login to continue</p>
            <form onSubmit={handleSubmit(onSubmit)} className='w-[100%] mt-[30px] flex flex-col '>
                <input required {...register('email')} type="email" name='email' placeholder='Email' className='outline-none bg-white border border-gray-500 w-full rounded-lg px-[20px] py-[5px] ' />
                <input required {...register('password')} type="password" name='password' placeholder='Password' className='outline-none bg-white border border-gray-500 w-full rounded-lg px-[20px] py-[5px] my-[20px]' />
                <div className='flex justify-end text-gray-500 text-[13px] mt-[5px] mb-[20px]'>
               <ToastContainer/>
                    
                </div>
                <input type="submit" value="Sign In" className='border rounded-lg cursor-pointer bg-gradient-to-tr from-white via-black to-white text-white w-fit mx-auto px-[10px] py-[5px]' />
            </form>

        </div>
    )
}

export default Login