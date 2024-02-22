"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'tailwindcss/tailwind.css';
import '../globals.css'

const page = () => {
  const [user, setUser] = useState<{name?:string, email?:string, age?:string, gender?:string}>({})
  const router = useRouter()


  const fetchData = async() => {
    try {
      const response = await axios.get("/api/profile");
      const data = await response.data?.user;
      setUser(data);
    } catch (error:any) {
      toast.error(error.response.data.error)
    }
  }

  const logoutUser = async() => {
    try {
      const {data} = await axios.get("/api/logout");
      // const data = await response.data?.user;
      toast.success(data.msg);
      setUser({});
      router.push("/login")

    } catch (error:any) {
      toast.error(error.response.data.error)
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  return (

    <div className='home'>
      <div className='min-h-screen flex justify-center items-center text-3xl border-black'>
        <div className="my-profile-card">
            <div className="mb-3">
            <h1>Name: {user && user.name}</h1>
            </div>
            <div className="mb-3">
                <h1>Email: {user && user.email}</h1>
            </div>    
            <div className="mb-3">
                <h1>Age: {user && user.age}</h1>
            </div>
            <div className="mb-3">
                <h1>Gender: female{user && user.gender}</h1>
            </div>          
            <div className="mb-3">
            <button onClick={logoutUser} className="register-login-button">Logout</button>

            </div>
        </div>
    </div>
    </div>
  )
}

export default page