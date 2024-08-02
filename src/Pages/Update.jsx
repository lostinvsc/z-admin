import React, { useState, useEffect, useContext } from 'react'
import Context from '../Context/Context'
import axios from 'axios'
import '../Css/Appointments.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Css/update.css'

import { useForm } from 'react-hook-form';
const Update = ({ margin }) => {
    let value = useContext(Context)
    const [image, setImage] = useState()
    const [file, setFile] = useState()

    const [service, setService] = useState([])
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm()

    const onSubmit = async (sdata) => {

        console.log(sdata)

        if (file) {

            const data = new FormData();
            data.append("file", file)
            data.append("upload_preset", "instagram")
            data.append("cloud_name", "tuntun")

            let res = await axios.post(`https://api.cloudinary.com/v1_1/tuntun/image/upload/`, data, {
            })

            senddata(res.data.url, sdata.name)

            reset()

        } else {
            toast.error("No file selected")
        }
    }



    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result);


            };
            reader.readAsDataURL(file);
        } else {
            seterror('Please select a valid image file');
        }

    };


    const senddata = async (url, name) => {
        let data = {
            url: url,
            name: name,
        }
        let res = await axios.post('https://z-care.onrender.com/addservice', data, {
            withCredentials: true,
        });
        if (res.data.status) {
            toast.success(res.data.message)
            setImage(null)
            getservice()
            setFile(null)
            setImage(null)
        } else {
            toast.error(res.data.message)
        }
    }


    const getservice = async () => {
        let res = await axios.get("https://z-care.onrender.com/getadminservice", {
            withCredentials: true,
        })
        setService(res.data)
  
    }

    useEffect(() => {
        getservice()
    }, [])


    const remove = async (id) => {
        let data = { id: id }
        let res = await axios.put("https://z-care.onrender.com/removeservice", data, {
            withCredentials: true,
        })
        getservice()
        if (res.data.status) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }



    return (
        <div id='update' style={{ marginTop: margin }} className='pt-[100px] '>

            {value.cookie &&
                <div className='w-fit mx-auto px-[20px] border border-gray-400 rounded-lg py-[10px] bg-white'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex w-fit flex-wrap mx-auto items-center gap-[30px]'>
                        <div className='fill border border-gray-400 rounded-lg p-[10px]'>
                            <label htmlFor="image" className='max-w-[100px]'><img id='prodimage' src={`${image ? image : '/upload.svg'}`} alt="" /></label>
                            <input required onChange={(e) => { handleImageChange(e) }} type="file" name="image" id="image" style={{ display: 'none' }} />
                        </div>
                        <input required type="text" {...register("name")} id='name' name='name' className='outline-none bg-white border border-gray-500 w-[30%] min-w-[200px] max-w-[400px] h-[40px] rounded-lg px-[20px] py-[5px]' />
                        <input disabled={isSubmitting} type="submit" value="Add" className='border rounded-lg cursor-pointer bg-gradient-to-tr from-white via-black to-white text-white w-fit mx-auto px-[10px] py-[5px]' />
                    </form>
                </div>
            }
            {value.cookie &&
                <div className="container mt-[40px]">
                    <div className="header hide11">Update</div>
                    <table>
                        <thead className='hide11'>
                            <tr>
                                <th>Sr.No.</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                service.length > 0 &&
                                service.map((value, index) => {
                                    return (
                                        <>
                                            <tr className='hide11'>
                                                <td>{index + 1}</td>
                                                <td>    <img className='inimage rounded-lg' src={value.url} alt="" /></td>
                                                <td>{value.name}</td>
                                                <td className='remove cursor-pointer' onClick={() => { remove(value._id) }} > Remove </td>
                                            </tr>
                                            <div className="container2 hide12">

                                                <div className="field">
                                                    <label>ID:</label>
                                                    <span>{index + 1}</span>
                                                </div>

                                                <div className="field items-center w-full">
                                                    <label>Image:</label>
                                                    <span>
                                                        <img className='inimage rounded-lg' src={value.url} alt="" />
                                                    </span>
                                                </div>

                                                <div className="field">
                                                    <label>Name:</label>
                                                    <span>{value.name}</span>
                                                </div>

                                                <a onClick={() => { remove(value._id) }} className="remove" href="#">Remove</a>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }

            <ToastContainer />
        </div>
    )
}

export default Update