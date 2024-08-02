import React, { useState, useEffect, useContext } from 'react'
import Context from '../Context/Context'
import axios from 'axios'
import '../Css/Appointments.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Css/Appointments.css'
const Messages = ({ margin }) => {
    let value = useContext(Context)
    const [messages, setMessages] = useState([])
    const getmessages = async () => {
        let res = await axios.get('https://z-care.onrender.com/getmessages', {
            withCredentials: true,
        })
        setMessages(res.data.reverse())
    }
    useEffect(() => {
        getmessages()
    }, [])

    const removemessage = async (id) => {
        let data = { id: id }
        let res = await axios.put('https://z-care.onrender.com/removemessage', data, {
            withCredentials: true,
        })
        setMessages(res.data)
    }


    return (
        <div id='appheading' style={{ marginTop: margin }} className={`pt-[100px]`}>
            {
                value.cookie &&

                <div className="container">
                    <div className="header hide11">Messages Information</div>
                    <table>
                        <thead className='hide11'>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Message</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                messages.length > 0 &&
                                messages.map((value, index) => {
                                    return (
                                        <>
                                            <tr className='hide11'>
                                                <td>{index + 1}</td>
                                                <td>{value.firstname} {value.lastname}</td>
                                                <td>{value.email}</td>
                                                <td>{value.phone}</td>
                                                <td>{value.message}</td>

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
                                                    <label>Email:</label>
                                                    <span>{value.email}</span>
                                                </div>

                                                <div className="field">
                                                    <label>Phone:</label>
                                                    <span>{value.phone}</span>
                                                </div>
                                                <div className="field">
                                                    <label>message:</label>
                                                    <span>{value.message}</span>
                                                </div>


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

export default Messages