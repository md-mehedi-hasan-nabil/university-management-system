import React, { useState } from 'react'
import Layout from '../components/StudentDashboard/Layout'
import logo from "../assets/seu_logo.png"
import a from "../assets/american-express.png"
import b from "../assets/credit-card.png"
import c from "../assets/cvv.png"
import d from "../assets/maestro.png"
import e from "../assets/visa.png"
import f from "../assets/shopping.png"
import checked from "../assets/checked.png"

export default function Payment() {
    const [payment, setPayment] = useState(0)
    const [showPayment, setShowPayment] = useState(true)
    const [loading, setLoading] = useState(false)

    function handlePayment() {
        setLoading(true)
        setTimeout(() => {
            setShowPayment(false)
        }, [1500])
    }

    return (
        <Layout>
            <div className='flex justify-center items-center'>
                {showPayment ? <div className='bg-white mt-10 px-8 pb-8 rounded-md shadow-md'>
                    <div className='text-center -mt-5'>
                        <img className='w-20 h-20 mx-auto' src={logo} alt="logo" />
                        <p className='text-xl font-medium mt-2 mb-4'>ums.com</p>
                    </div>
                    <div className='flex gap-6 justify-center items-center'>
                        <div className='flex flex-col justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>

                            <p>Support</p>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                            <p>FAQ</p>
                        </div>

                        <div className='flex flex-col justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                            </svg>

                            <p>Offer</p>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>

                            <p>Login</p>
                        </div>
                    </div>
                    <button className='bg-purple-500 px-4 py-1 w-full text-white font-medium mt-4 rounded-md'>
                        Cards
                    </button>
                    <div className='grid grid-cols-12 gap-6 mt-4'>
                        <img className='col-span-4 w-16 h-16 object-cover cursor-pointer hover:scale-105' src={a} alt="" />
                        <img className='col-span-4 w-16 h-16 object-cover cursor-pointer hover:scale-105' src={b} alt="" />
                        <img className='col-span-4 w-16 h-16 object-cover cursor-pointer hover:scale-105' src={c} alt="" />
                        <img className='col-span-4 w-16 h-16 object-cover cursor-pointer hover:scale-105' src={d} alt="" />
                        <img className='col-span-4 w-16 h-16 object-cover cursor-pointer hover:scale-105' src={e} alt="" />
                        <img className='col-span-4 w-16 h-16 object-cover cursor-pointer hover:scale-105' src={f} alt="" />
                    </div>
                    <div className='mt-2'>
                        <input onChange={e => setPayment(e.target.value)} value={payment} className='border rounded-md w-full mt-3' placeholder='Enter amount' type="number" name="payment" />
                    </div>
                    <button onClick={handlePayment} className='mt-4 bg-purple-500 hover:bg-purple-700 text-white font-medium py-2 w-full rounded-md'>Pay{!payment ? "" : "$"} {payment}</button>
                    {loading && <p className='mt-1'>Loading...</p>}
                </div> : <div className='text-center mt-10'>
                    <img className='w-32 mx-auto my-4' src={checked} alt="checked" />
                    <p className='text-2xl font-semibold'>Transaction Completed Successfully</p>
                    <p className='text-lg my-2'>Thank you for your billing.</p>
                    <button className='bg-green-500 hover:bg-green-600 w-full py-2 rounded-md text-white font-medium text-lg mt-3' onClick={() => {
                        setShowPayment(true)
                        setLoading(false)
                        setPayment(0)
                    }}>Go Back</button>
                </div>}
            </div>
        </Layout>
    )
}
