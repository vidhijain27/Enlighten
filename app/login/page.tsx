"use client"
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginPage = () => {

  const router = useRouter()

    const [state, setState] = useState({
        email:'',
        password:''
    });

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setState({...state,[e.target.name]:e.target.value})
    } 
    
    const onSubmitHandler = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          
          if(!state.email || !state.password) {
            toast.error("Please fill all fields")
            return
          }
            const response = await axios.post('/api/login', state);
            const data = await response.data;
            toast.success(data.msg);

            // router.push("/myprofile");
            router.push("/landingpage.html");
            rewrites: async () => [
              {
                source: "/public/landingpage.html",
                destination: "/app/api/homepage.js",
              },
            ]

        } catch (error:any) {
            toast.error(error.response.data.error);
        }
    }




  return (
    <>
        <section className="text-gray-600 body-font">
  <div className="container px-5 py-10 mx-auto flex flex-wrap items-center">
    <form onSubmit={onSubmitHandler} className="box">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login to your Account</h2>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input onChange={onChangeHandler} value={state.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
        <input onChange={onChangeHandler} value={state.password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <button className="register-login-button">Login</button>
      <div className="flex justify-between items-center">
      <p className="text-xs text-gray-500 mt-3">
        Don't have an Account ? <Link href={'/register'}>Register</Link>
      </p>
      <p className="text-xs text-gray-500 mt-3">
        Forget <Link href={'/forget-password'}>Password ?</Link>
      </p>
      </div>
    </form>
  </div>
</section>
    </>
  )
}

export default LoginPage
