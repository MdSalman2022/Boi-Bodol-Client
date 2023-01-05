import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
// import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'

import { AiFillStar } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';



const CardDetail = () => {

    const { user } = useContext(AuthContext)

    const [details] = useLoaderData();

    const { _id, name, sname, price, condition, publication, edition, authenticity, nagotiable, courier, phoneNo, description, email, img, sold, trending, featured, urgent, division, district, upazila, dateAdded, date, categoryId, category } = details;

    console.log(details);


    const handleBooking = (event, data) => {
        event.preventDefault();

        console.log(data);
        const name = data.name
        const sname = data.sname
        const pId = data._id
        const email = user.email
        const img = data.img
        const price = data.price
        const location = data.upazila
        const phoneNo = data.phoneNo
        const time = new Date().toLocaleString()

        const booking = {
            name,
            sname,
            img,
            email,
            price,
            location,
            phoneNo,
            pId,
            time
        }
        console.log(booking);
        fetch(`${process.env.REACT_APP_SERVER_LINK}/wishlist`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            // headers: {
            //     'content-type': 'application/json',
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`${booking.name} added to wishlist`)
                // Navigate('/dashboard/myproducts')
            })

        console.log(booking)

    }



    const [cart, setCart] = useState([])

    //filtering orders by email
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/wishlist?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setCart(data))
    }, [user?.email, cart])

    console.log(cart.filter(cart => cart.pId === _id))

    const isAdded = cart.filter(cart => cart.pId === _id)



    return (
        <div className="bg-base-100">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <li key={_id}>
                            <div className="flex items-center">
                                <a className="mr-2 text-sm font-medium text-gray-900">
                                    {category ? category : 'Others'}
                                </a>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>

                        <li className="text-sm">
                            <a aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {name}
                            </a>
                        </li>
                    </ol>
                </nav>

                {/* Image gallery */}
                <div className="mx-auto flex justify-center ">
                    <div className="w-80 h-full hidden overflow-hidden rounded-lg lg:block">
                        <LazyLoadImage
                            src={img}
                            alt="book"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 flex justify-between">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{name}</h1>
                        <div>
                            <p className='mx-1 badge uppercase text-secondary'>{condition}</p>
                            <p className='mx-1 badge uppercase text-secondary'>{authenticity}</p>
                            {trending ? <p className='mx-1 badge uppercase text-secondary'>Trending</p> : ''}
                            {featured ? <p className='mx-1 badge uppercase text-secondary'>Featured</p> : ''}
                        </div>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">Price: {price}Tk <div className="badge badge-md  text-secondary">{`${nagotiable === true ? "Nagotiable" : ''}`}</div></p>

                        <form className="mt-10">
                            {/* Colors */}
                            <div>
                                <h3 className="text font-semibold text-gray-900">For sale by: <span className="font-normal">{sname}</span> </h3>
                                <h3 className="text font-semibold text-gray-900">Contact: <span className="font-normal">{phoneNo}</span> </h3>
                                <h3 className="text font-semibold text-gray-900">Email: <span className="font-normal">{email}</span> </h3>
                                {/* <p>For sale by: {sname}</p>
                                <p>{phoneNo}</p>
                                <p>{email}</p>

                                <p>{urgent}</p>*/}
                                <p className='font-bold'>Posted :
                                    {(parseInt(new Date() - new Date(dateAdded)) / (1000 * 60 * 60)).toFixed(0) > 24
                                        ?

                                        `${((parseInt(new Date() - new Date(dateAdded)) / (1000 * 60 * 60)).toFixed(0) / 24).toFixed(0)}` > 1

                                            ?

                                            ` ${((parseInt(new Date() - new Date(dateAdded)) / (1000 * 60 * 60)).toFixed(0) / 24).toFixed(0)} days ago ${((parseInt(new Date() - new Date(dateAdded)) / (1000 * 60 * 60)).toFixed(0) % 24).toFixed(0)} hours ago`
                                            :
                                            `1 day ${((parseInt(new Date() - new Date(dateAdded)) / (1000 * 60 * 60)).toFixed(0) % 24).toFixed(0)} hours ago`
                                        :
                                        `${(parseInt(new Date() - new Date(dateAdded)) / (1000 * 60 * 60)).toFixed(0)} hours ago`


                                    }
                                </p>

                            </div>
                            <div className="divider"></div>
                            {/* Sizes */}
                            <div className="">
                                <div className="flex items-center justify-between">

                                    {/* <h3 className="text font-medium text-gray-900">Urgent: {urgent === true ? "Urgent Sale" : "No"} </h3> */}
                                    <h3 className="text font-medium text-gray-900">Location: <span className="font-semibold"> {upazila}, {district}, {division}</span> </h3>
                                </div>
                            </div>

                            <button disabled={isAdded.length > 0 ? true : false} onClick={(event) => handleBooking(event, details)} class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-secondary transition duration-300 ease-out border-2 border-neutral rounded-full shadow-md group">
                                <span class={`absolute inset-0 flex items-center justify-center w-full h-full text-secondary duration-300 -translate-x-full bg-secondary ${isAdded.length > 0 ? "" : "group-hover:translate-x-0"}  ease`}>
                                    <GrAdd className='text-secondary' />
                                </span>
                                <span class={`absolute flex items-center justify-center w-full h-full transition-all duration-300 transform  ${isAdded.length > 0 ? " bg-base-100 text-neutral " : " bg-neutral text-secondary  group-hover:translate-x-full"}  ease font-semibold`}>{isAdded.length > 0 ? "Already Added" : "Add to Wishlist"}</span>
                                <span class="relative invisible">{isAdded.length > 0 ? "Already Added" : "Add to Wishlist"}</span>
                            </button>

                        </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-1 lg:pb-16 lg:pr-8">
                        {/* Description and details */}
                        <div className='flex justify-between'>

                            <div className="w-96">
                                <h3 className="mt-5 text-xl font-bold">Description</h3>
                                <p className="text-base text-gray-900">{description}</p>
                            </div>

                            <div className='mt-5'>
                                <p className='text-lg font-semibold'>Publication: <span className="font-normal">{publication}</span></p>
                                <p className='text-lg font-semibold'>Edition: <span className="font-normal">{edition}</span></p>
                                <p className='text-lg font-semibold'>Courier: <span className='font-normal'>{courier ? 'Available' : 'Not Available'}</span></p>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CardDetail;