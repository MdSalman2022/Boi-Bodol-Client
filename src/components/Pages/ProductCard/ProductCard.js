import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { GoVerified } from 'react-icons/go';
import toast from 'react-hot-toast';
import { AiFillStar } from 'react-icons/ai';
import { BiAddToQueue } from 'react-icons/bi';
import { GrFavorite } from 'react-icons/gr';
import { Link, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { MdRemoveRedEye } from 'react-icons/md';
import { motion } from 'framer-motion';
import { animateScroll as scroll } from 'react-scroll'

const ProductCard = ({ book, icon, grid }) => {

    // product details

    const { name, img, _id, location, description, sname, phoneNo, dateAdded, price, email, upazila, district } = book;

    let { user } = useContext(AuthContext)



    const handleBooking = data => {
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

    const navigate = useNavigate()

    const handleCardDetail = id => {
        console.log(id);
        navigate(`/details/${id}`)
    }


    const scrolltop = () => {
        scroll.scrollToTop();
    }

    return (

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} key={_id} className={` transition-all duration-300 ease-in-out group relative hover:bg-accent hover:scale-105 card card-compact bg-base-100 flex flex-row  flex-wrap w-80 lg:w-full justify-center  gap-2 shadow-lg rounded-lg'} `} >

            <Link to={`/details/${_id}`} preventScrollReset={false} onClick={scrolltop}>
                <figure className='  relative'>

                    <LazyLoadImage className='rounded-t-lg object-cover h-80 w-96' name="img" src={img} alt="Shoes" />
                    <div class="absolute bg-white bg-opacity-40 transition-all top-0 left-0 w-full flex flex-col justify-center items-center  opacity-0 group-hover:h-full group-hover:opacity-100 duration-300">
                        <h1 class="text-2xl text-secondary font-bold">{name}</h1>
                        <div class="mx-auto h-20 w-20 flex justify-center items-center">
                            <div class="h-12 w-12 bg-base-100  items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-110 transition duration-300 ease-out">
                            </div>
                            <button class="text-center text-secondary font-semibold z-10 pointer-events-none">
                                <MdRemoveRedEye className='text-2xl ' />
                            </button>
                        </div>

                    </div>
                </figure>

            </Link>

            <div className="card-body py-2 relative">
                <h2 className="card-title" name="name">{name} {icon ? icon : ''}</h2>
                <p className='font-semibold' name="time">Posted: {

                    (parseInt(new Date() - new Date(dateAdded)) / (1000 * 60 * 60)).toFixed(0) >= 24
                        ?
                        `${((parseInt(new Date() - new Date(dateAdded)) / (1000 * 60 * 60)).toFixed(0) / 24).toFixed(0)}` > 1 ? ` ${((parseInt(new Date() - new Date(dateAdded)) / (1000 * 60 * 60)).toFixed(0) / 24).toFixed(0)} days ago` : '1 day ago'

                        :

                        `${(parseInt(new Date() - new Date(dateAdded)) / (1000 * 60 * 60)).toFixed(0)} hours ago`

                }</p>
                <p className='font-semibold' name="sname">By: {sname}</p>
                <p className='font-semibold' name="location">Location: {upazila}, {district}</p>
                <p className='text-left text-xl font-semibold' name="price">Price: {price}Tk</p>
                <div className={`card-actions  mt-3 ${grid ? 'flex  ' : 'justify-end '}`}>

                    <div className='card-actions  mt-3 flex absolute bottom-5 right-5'>
                        <button onClick={() => handleBooking(book)} className="btn w-14 h-14 rounded-full btn-ghost text-neutral text-3xl  p-2"><BiAddToQueue /></button>
                    </div>
                </div>
            </div>
        </motion.div >
    );
};

export default ProductCard;