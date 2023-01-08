import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { AiOutlineSearch } from 'react-icons/ai';

const Header = () => {


    const navigate = useNavigate();

    const { user, logOut } = useContext(AuthContext)
    let { searchText, items, setItems, setSearchText, loading } = useContext(AuthContext)


    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {


        setSearchText(data.name);
        console.log(data.name);
        console.log(searchText);
        if (data.name === " ") {
            navigate(`/`)
        }
        else { data.name ? navigate(`/search/${data.name}`) : navigate(`/`) }

        console.log(errors);
    }



    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error))
    }


    return (

        <div className="container mx-auto grid grid-cols-4 lg:grid-cols-5 mt-5">
            <div className="logo hidden lg:flex">
                <Link to='/' className=" normal-case text-3xl text-neutral font-semibold underline decoration-primary">
                    <LazyLoadImage src="https://i.ibb.co/NsGx83q/logoboi.png" className='w-32' alt="logo" border="0" />
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="pl-3 lg:pl-0 w-full search col-span-3 mb-2 h-12">
                <div className="input-group">
                    <input defaultValue={searchText} type="text" placeholder="Search for a Book" className="input input-bordered border-neutral  w-full"  {...register("name", { required: true, maxLength: 80 })} />
                    <button type="submit" className='bg-neutral text-base-100 font-bold px-3 text-2xl'><AiOutlineSearch /></button>
                </div>
            </form>
            <div className="grid justify-items-end">
                {
                    user?.uid ?
                        <div className="dropdown dropdown-end space-y-3">
                            <label tabIndex={0} className="flex justify-center items-center gap-5">
                                <p>{user.displayName}</p>
                                <div className="avatar mr-2">
                                    <div className="w-12 rounded-full">
                                        <LazyLoadImage className='border-2 rounded-full border-neutral p-1 bg-transparent' src={user?.photoURL !== null ? user?.photoURL : "https://i.ibb.co/DM3jqw5/Profile-avatar-placeholder-large.png"} />
                                        {/* <img src="https://i.ibb.co/DM3jqw5/Profile-avatar-placeholder-large.png" alt="Profile-avatar-placeholder-large" border="0"></img> */}
                                    </div>
                                </div>
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-secondary rounded-box w-52 ">
                                <li><Link className="rounded-xl text-white focus:text-neutral " to='/dashboard'>My Account</Link></li>
                                <li className='rounded-xl text-white focus:text-neutral '><a onClick={handleLogOut}>Logout</a></li>
                            </ul>
                        </div>
                        :
                        <div>
                            <div className="hidden lg:flex">
                                <Link to='/login' className="btn btn-secondary text-white mr-2">Login</Link>
                                <Link to='/register' className="btn btn-secondary text-white">Register</Link>
                            </div>

                            <div className="dropdown dropdown-end space-y-3">
                                <label tabIndex={0} className="btn btn-ghost lg:hidden ">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-secondary rounded-box w-52 ">
                                    <li><Link to='/login' className="btn btn-secondary text-white mr-2">Login</Link></li>
                                    <li><Link to='/register' className="btn btn-secondary text-white">Register</Link></li>
                                </ul>
                            </div>
                        </div>

                }
            </div>
        </div>
    );
};

export default Header;