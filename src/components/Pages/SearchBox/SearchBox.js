import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../ProductCard/ProductCard';
import { useForm } from 'react-hook-form';

function SearchBox() {

    const navigate = useNavigate();

    let { searchText, items, setItems, setSearchText, loading } = useContext(AuthContext)

    // let buyers = allUsers?.filter(allUser => allUser?.role === 'buyer')

    // const handleSubmit = (event) => {
    //     Event.stopPropagation()

    //     setSearchText(event.target.search.value)
    //     console.log(searchText)

    //     // navigate(`/search/${searchText}`)
    // }

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


    return (
        <div className="hero bg-transparent rounded-xl lg:mx-auto ">

            <div className="hero-content flex-col lg:flex-row-reverse lg:gap-96 mx-auto text-center">
                <div>
                    <h1 className="text-5xl font-semibold text-center flex justify-center ">

                        <img src="https://i.ibb.co/MPqdr3W/logo.png" className='w-32' alt="logo" border="0"></img>

                    </h1>
                    <p className="py-6 font-semibold">We will help you to get the best deal possible in our marketplace.</p>
                    <div className='max-w-md mx-auto'>
                        <div className="relative flex items-center w-full h-12 rounded-lg transition-all duration-300 ease-in-out focus-within:shadow-lg bg-white overflow-hidden border-2 border-secondary">
                            <div className="grid place-items-center h-full w-12 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>

                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input className='peer h-full w-full outline-none text-sm text-gray-700 pr-32 lg:pr-52 py-10' defaultValue={searchText} type="text" placeholder="Search for a Book" {...register("name", { required: true, maxLength: 80 })} />
                            </form>
                        </div>
                    </div>
                    <div className="divider">Or</div>
                    <div className='max-w-md mx-auto'>
                        <div className="relative flex items-center w-full h-12 my-10 mx-auto justify-center">
                            <Link to="/dashboard/addproduct"><button className="btn btn-neutral text-secondary">Post an ad</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchBox;
