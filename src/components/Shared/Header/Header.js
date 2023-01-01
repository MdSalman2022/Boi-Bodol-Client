import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Header = () => {

    const { user, logOut } = useContext(AuthContext)

    const [role, setRole] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setRole(data[0]?.role))
    }, [user?.email])


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }


    return (
        <div className="navbar bg-base-100 container mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link className="rounded-xl mr-2 text-neutral focus:text-white " to='/home'>Home</Link></li>
                        <li><Link className="rounded-xl mr-2 text-neutral focus:text-white " to='/allads'>All Ads</Link></li>
                        {user && <li><NavLink className="rounded-xl " to='/dashboard'>My Account</NavLink></li>}
                        {
                            user?.uid ?
                                <div className="navbar-end">
                                    <div className="avatar mr-2">
                                        <div className="w-12 rounded-full">
                                            <img src={user.photoURL} />
                                        </div>
                                    </div>
                                    <p className='font-bold mr-2'>{user?.displayName}</p>
                                    <Link onClick={handleLogOut} className="btn btn-neutral mr-2">Logout</Link>
                                </div>
                                :
                                <div className="navbar-end">
                                    <Link to='/login' className="btn btn-neutral mb-2">Login</Link>
                                    <Link to='/register' className="btn btn-neutral">Register</Link>
                                </div>

                        }
                    </ul>
                </div>
                <Link to='/' className=" normal-case text-3xl text-neutral font-bold underline decoration-primary">BoiBodol</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0 text-secondary">
                    <li><Link className="rounded-xl mr-2 text-neutral focus:text-white " to='/home'>Home</Link></li>
                    <li><Link className="rounded-xl mr-2 text-neutral focus:text-white " to='/allads'>All Ads</Link></li>
                    {user && <li><Link className="rounded-xl text-neutral focus:text-white " to='/dashboard'>My Account</Link></li>}
                </ul>
            </div>
            {
                user?.uid ?
                    <div className="navbar-end hidden mg:flex lg:flex">
                        <div className="avatar mr-2">
                            <div className="w-12 rounded-full">
                                <img src={user.photoURL} />
                            </div>
                        </div>
                        <p className='font-bold mr-2'>{user?.displayName}</p>
                        <Link onClick={handleLogOut} className="btn btn-neutral mr-2">Logout</Link>
                    </div>
                    :
                    <div className="navbar-end hidden md:flex lg:flex">
                        <Link to='/login' className="btn btn-neutral mr-2 text-secondary">Login</Link>
                        <Link to='/register' className="btn btn-neutral text-secondary">Register</Link>
                    </div>

            }
        </div>
    );
};

export default Header;