import React, { useState, useEffect, useContext } from 'react'
import Context from '../Context/Context'
import axios from 'axios'
import '../Css/Appointments.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Css/Appointments.css'
const Appointments = ({ margin }) => {
    let value = useContext(Context)
    const [appointments, setAppointments] = useState([])
    const getappointments = async () => {
        let res = await axios.get('https://z-care.onrender.com/getappointments', {
            withCredentials: true,
        })
        setAppointments(res.data)
    }
    useEffect(() => {
        getappointments()
    }, [])


    const remove = async (id) => {
        let data = { id: id }
        let res = await axios.put("https://z-care.onrender.com/removeappointment", data, {
            withCredentials: true,
        })

        if (res.data.status) {
            toast.success(res.data.message)
            getappointments()
        } else {
            toast.error(res.data.message)
        }
    }
    console.log(margin)
    return (

        <div id='appheading' style={{ marginTop: margin }} className={`pt-[100px]`}>
            {
                value.cookie &&

                <div className="container">
                    <div className="header hide11">Appointments Information</div>
                    <table>
                        <thead className='hide11'>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Name</th>
                                <th>Disease</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appointments.length > 0 &&
                                appointments.map((value, index) => {
                                    return (
                                        <>
                                            <tr className='hide11'>
                                                <td>{index + 1}</td>
                                                <td>{value.firstname} {value.lastname}</td>
                                                <td>{value.disease}</td>
                                                <td>{value.gender}</td>
                                                <td>{value.age}</td>
                                                <td> <a id='phone' className='w-[10%]' href={`tel:${value.phone}`}>{value.phone}</a></td>
                                                <td>{value.address}</td>
                                                <td className='remove cursor-pointer' onClick={() => { remove(value._id) }} > Remove </td>
                                            </tr>
                                            <div className="container2 hide12">

                                                <div className="field">
                                                    <label>ID:</label>
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className="field">
                                                    <label>Name:</label>
                                                    <span>{value.firstname} {value.lastname}</span>
                                                </div>
                                                <div className="field">
                                                    <label>Gender:</label>
                                                    <span>{value.gender}</span>
                                                </div>
                                                <div className="field">
                                                    <label>Disease:</label>
                                                    <span>{value.disease}</span>
                                                </div>
                                                <div className="field">
                                                    <label>Age:</label>
                                                    <span>{value.age}</span>
                                                </div>
                                                <div className="field">
                                                    <label>Phone:</label>
                                                    <span>{value.phone}</span>
                                                </div>
                                                <div className="field">
                                                    <label>Address:</label>
                                                    <span>{value.address}</span>
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

export default Appointments