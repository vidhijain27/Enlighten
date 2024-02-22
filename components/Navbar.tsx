import React from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
return (
    <>
    <ToastContainer/>
        <header className='navbar'>
            <nav className="navbar-components">
            <img src="logo.png" className='h-14 w-15'/>
                    <Link href={'/'} className='nav-heading'>ENLIGHTEN</Link>
                    <ul className='flex items-center gap-x-3'>
                        {/* <li>
                            <Link href={'/myprofile'} className='nav-link'>Your Profile</Link>
                        </li> */}
                        <li>
                            <Link href={'/login'} className='nav-link'>Login</Link>
                        </li>
                        <li>
                            <Link href={'/register'} className='nav-link'>Register</Link>
                        </li>
                    </ul>
            </nav>
        </header>
    </>
    )
}

export default Navbar
