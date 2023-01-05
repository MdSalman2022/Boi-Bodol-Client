import React, { useContext, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Header = () => {

    const { user, logOut } = useContext(AuthContext)

    // const [role, setRole] = useState('')

    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_SERVER_LINK}/users?email=${user?.email}`)
    //         .then(res => res.json())
    //         .then(data => setRole(data[0]?.role))
    // }, [user?.email])


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }


    return (
        <div className="navbar bg-base-100 container mx-auto ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link className="rounded-xl mr-2 text-neutral focus:text-secondary " to='/home'>Home</Link></li>
                        <li><Link className="rounded-xl mr-2 text-neutral focus:text-secondary " to='/allads'>All Ads</Link></li>
                        {user && <li><NavLink className="rounded-xl " to='/dashboard'>My Account</NavLink></li>}
                        {
                            user?.uid ?
                                <div className="navbar-end">
                                    <div className="avatar mr-2">
                                        <div className="w-12 rounded-full">
                                            <LazyLoadImage src={user.photoURL} width={100} />
                                        </div>
                                    </div>
                                    <p className='font-semibold mr-2'>{user?.displayName}</p>
                                    <Link onClick={handleLogOut} className="btn btn-secondary text-white mr-2">Logout</Link>
                                </div>
                                :
                                <div className="navbar-end">
                                    <Link to='/login' className="btn btn-secondary text-white mb-2">Login</Link>
                                    <Link to='/register' className="btn btn-secondary text-white">Register</Link>
                                </div>

                        }
                    </ul>
                </div>
                <Link to='/' className=" normal-case text-3xl text-neutral font-semibold underline decoration-primary">
                    <LazyLoadImage src="https://i.ibb.co/NsGx83q/logoboi.png" className='w-32' alt="logo" border="0" />
                </Link>
            </div>
            <div class="flex grow  items-center p-6 space-x-6 bg-transparent rounded-xl w-full">
                <div class="flex bg-gray-100 p-4 w-96 border-2 space-x-4 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input class="bg-gray-100 outline-none" type="text" placeholder="Article name or keyword..." />
                </div>

                <div class="bg-gray-800 py-3 px-5 text-secondary font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
                    <span>Search</span>
                </div>
            </div>


            {
                user?.uid ?
                    <div className="navbar-end hidden mg:flex lg:flex">

                        <div className="dropdown dropdown-end space-y-3">
                            <label tabIndex={0} className="">
                                <div className="avatar mr-2">
                                    <div className="w-12 rounded-full">
                                        <LazyLoadImage className='border-2 rounded-full border-neutral p-1 bg-transparent' src={user.photoURL ? user.photoURL : "https://i.ibb.co/DM3jqw5/Profile-avatar-placeholder-large.png"} />
                                        {/* <img src="https://i.ibb.co/DM3jqw5/Profile-avatar-placeholder-large.png" alt="Profile-avatar-placeholder-large" border="0"></img> */}
                                    </div>
                                </div>
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-secondary rounded-box w-52">
                                <li><Link className="rounded-xl text-neutral focus:text-secondary " to='/dashboard'>My Account</Link></li>
                                <li><a onClick={handleLogOut}>Logout</a></li>
                            </ul>
                        </div>
                        {/* <Link onClick={handleLogOut} className="btn btn-secondary text-white mr-2">Logout</Link> */}
                    </div>
                    :
                    <div className="navbar-end hidden md:flex lg:flex">
                        <Link to='/login' className="btn btn-secondary text-white mr-2 text-secondary">Login</Link>
                        <Link to='/register' className="btn btn-secondary text-white text-secondary">Register</Link>
                    </div>

            }
        </div >
    );
};

export default Header;