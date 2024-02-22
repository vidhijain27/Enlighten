"use client"
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import '../globals.css';
import { useRouter } from 'next/navigation';


const RegisterPage = () => {

    const router = useRouter()
    const [state, setState] = useState({
        name:'',
        email:'',
        password:'',
        age:'',
        gender: ''
    });

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setState({...state,[e.target.name]:e.target.value})
        // console.log(e.target.value)
    } 
    
    const onSubmitHandler = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!state.email || !state.password || !state.name || !state.age || !state.gender) {
            toast.error("Please fill all fields")
            return
        }
        try {
            const response = await axios.post('/api/register', state);
            const data = await response.data;
            toast.success("Register Succesfully");
            setState({
                name:'',
                email:'',
                password:'',
                age:'',
                gender: ''
            })
            router.push('/login');
        } catch (error:any) {
            toast.error(error?.response?.data?.error);
        }
    }


  return (
    <>
        <section className="text-gray-600 body-font">
  <div className="container">
    <form onSubmit={onSubmitHandler} className="box">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Create your Account</h2>
      <div className="relative mb-4">
        <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Enter your Name</label>
        <input onChange={onChangeHandler} value={state.name} type="text" id="full-name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input onChange={onChangeHandler} value={state.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
        <input onChange={onChangeHandler} value={state.password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div className="relative mb-4">
        <label htmlFor="age" className="leading-7 text-sm text-gray-600">Age</label>
        <input onChange={onChangeHandler} value={state.age} type="text" id="age" name="age" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <div
  className="flex flex-col items-start gap-4 overflow-hidden rounded-md p-2 shadow-sm shadow-[#00000050]">
  <span
    className="leading-7 text-sm text-gray-600"
    >Please select your gender</span>
  <div className="flex items-center gap-4">
    <div className="relative flex h-[40px] w-[40px] items-center justify-center">
      <input onChange={onChangeHandler} type="radio" id="radio" name="gender" value="male"className="peer z-10 h-full w-full cursor-pointer opacity-0"/>
      <div
        className="absolute h-full w-full rounded-full bg-blue-100 p-4 shadow-sm shadow-[#00000050] ring-blue-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"
      ></div>
      <div
        className="absolute -z-10 h-full w-full scale-0 rounded-full bg-blue-200 duration-500 peer-checked:scale-[500%]"
      ></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        fill="none"
        className="absolute stroke-blue-400"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.5631 16.1199C14.871 16.81 13.9885 17.2774 13.0288 17.462C12.0617 17.6492 11.0607 17.5459 10.1523 17.165C8.29113 16.3858 7.07347 14.5723 7.05656 12.5547C7.04683 11.0715 7.70821 9.66348 8.8559 8.72397C10.0036 7.78445 11.5145 7.4142 12.9666 7.71668C13.9237 7.9338 14.7953 8.42902 15.4718 9.14008C16.4206 10.0503 16.9696 11.2996 16.9985 12.6141C17.008 13.9276 16.491 15.1903 15.5631 16.1199Z"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M14.9415 8.60977C14.6486 8.90266 14.6486 9.37754 14.9415 9.67043C15.2344 9.96332 15.7093 9.96332 16.0022 9.67043L14.9415 8.60977ZM18.9635 6.70907C19.2564 6.41617 19.2564 5.9413 18.9635 5.64841C18.6706 5.35551 18.1958 5.35551 17.9029 5.64841L18.9635 6.70907ZM16.0944 5.41461C15.6802 5.41211 15.3424 5.74586 15.3399 6.16007C15.3374 6.57428 15.6711 6.91208 16.0853 6.91458L16.0944 5.41461ZM18.4287 6.92872C18.8429 6.93122 19.1807 6.59747 19.1832 6.18326C19.1857 5.76906 18.8519 5.43125 18.4377 5.42875L18.4287 6.92872ZM19.1832 6.17421C19.1807 5.76001 18.8429 5.42625 18.4287 5.42875C18.0145 5.43125 17.6807 5.76906 17.6832 6.18326L19.1832 6.17421ZM17.6973 8.52662C17.6998 8.94082 18.0377 9.27458 18.4519 9.27208C18.8661 9.26958 19.1998 8.93177 19.1973 8.51756L17.6973 8.52662ZM16.0022 9.67043L18.9635 6.70907L17.9029 5.64841L14.9415 8.60977L16.0022 9.67043ZM16.0853 6.91458L18.4287 6.92872L18.4377 5.42875L16.0944 5.41461L16.0853 6.91458ZM17.6832 6.18326L17.6973 8.52662L19.1973 8.51756L19.1832 6.17421L17.6832 6.18326Z"
        ></path>
      </svg>
    </div>
    <div className="relative flex h-[40px] w-[40px] items-center justify-center">
      <input onChange={onChangeHandler} type="radio" id="radio" name="gender" value="female" className="peer z-10 h-full w-full cursor-pointer opacity-0"/>
      <div
        className="absolute h-full w-full rounded-full bg-pink-100 p-2 shadow-sm shadow-[#00000050] ring-pink-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"
      ></div>
      <div
        className="absolute -z-10 h-full w-full scale-0 rounded-full bg-pink-200 duration-500 peer-checked:scale-[500%]"
      ></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35px"
        height="35px"
        viewBox="0 0 24 24"
        fill="none"
        className="absolute fill-pink-400"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z"
        ></path>
      </svg>
    </div>
    <div className="relative flex h-[40px] w-[40px] items-center justify-center">
      <input onChange={onChangeHandler} type="radio" name="gender" value="other" className="peer z-10 h-full w-full cursor-pointer opacity-0"
      />
      <div
        className="absolute h-full w-full rounded-full bg-purple-100 p-2 shadow-sm shadow-[#00000050] ring-purple-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"
      ></div>
      <div
        className="absolute -z-10 h-full w-full scale-0 rounded-full bg-purple-200 duration-500 peer-checked:scale-[500%]"
      ></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="40px"
        height="40px"
        viewBox="0 0 512 512"
        version="1.1"
        className="absolute fill-purple-400"
      >
        <g id="drop" transform="translate(42.666667, 70.248389)">
          <path
            d="M226.597,200.834611 L296.853333,271.084945 L353.819,271.084 L326.248389,243.503223 L356.418278,213.333333 L435.503223,292.418278 L356.418278,371.503223 L326.248389,341.333333 L353.82,313.751 L279.163435,313.751611 L196.418,231.011611 L226.597,200.834611 Z M356.418278,1.42108547e-14 L435.503223,79.0849447 L356.418278,158.169889 L326.248389,128 L353.82,100.418 L296.853333,100.418278 L83.503232,313.751611 L-1.0658141e-13,313.751611 L-1.03968831e-13,271.084945 L65.8133333,271.084945 L279.163435,57.7516113 L353.82,57.751 L326.248389,30.1698893 L356.418278,1.42108547e-14 Z M83.503232,57.7516113 L166.248,140.490611 L136.069,170.667611 L65.8133333,100.418278 L-1.0658141e-13,100.418278 L-1.0658141e-13,57.7516113 L83.503232,57.7516113 Z"
          ></path>
        </g>
      </svg>
    </div>
  </div>
</div>
<br/>
      <button className='register-login-button'>Register</button>
      <p className="text-xs text-gray-500 mt-3">
        Already have an Account ? <Link href={'/login'}>Login</Link>
      </p>
    </form>
  </div>
</section>
    </>
  )
}

export default RegisterPage
