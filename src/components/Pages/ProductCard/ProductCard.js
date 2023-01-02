import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { GoVerified } from 'react-icons/go';
import toast from 'react-hot-toast';
import { AiFillStar } from 'react-icons/ai';
import { BiAddToQueue } from 'react-icons/bi';
import { GrFavorite } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const ProductCard = ({ book, icon, grid }) => {

    // product details

    const { name, img, _id, location, description, sname, phoneNo, dateAdded, price, email, upazila, district } = book;



    let { allUsers, user } = useContext(AuthContext)


    // const handleReportItem = data => {
    //     const agree = window.confirm(`Do you want to report this product named ${data.name}`)
    //     if (agree) {
    //         fetch(`http://localhost:5000/reportedProducts/${data._id}`, {
    //             method: "PUT",
    //             headers: {
    //                 "content-type": "application/json",
    //             },
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 if (data.matchedCount > 0) {
    //                     toast.success(`${data.name} reported successfully!`);
    //                 }
    //             });
    //     }
    // }



    const handleBooking = data => {
        const name = data.name
        const sname = data.sname
        const pId = data._id
        const email = data.email
        const img = data.img
        const price = data.price
        const location = data.upazila
        const phoneNo = data.phoneNo

        const booking = {
            name,
            sname,
            img,
            email,
            price,
            location,
            phoneNo,
            pId,
        }
        console.log(booking);
        fetch('http://localhost:5000/wishlist', {
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

    console.log(grid)

    return (

        <div className={`${grid ? 'card card-compact bg-base-100 shadow-xl border-2 border-neutral rounded-lg' : 'flex flex-row w-full justify-center flex-wrap gap-5 border-2 border-neutral rounded-lg'} `} >
            <figure className='p-2 '><img className='rounded-lg object-cover h-80' name="img" src={img} alt="Shoes" /></figure>
            <div className="card-body py-2 relative">
                <h2 className="card-title" name="name">{name} {icon ? icon : ''}</h2>
                <p className='font-semibold' name="time">Posted: {

                    (parseInt(new Date() - new Date(dateAdded)) / (1000 * 60 * 60)).toFixed(0) > 24
                        ?
                        `${(parseInt(new Date() - new Date(dateAdded)) / (1000 * 60 * 60)).toFixed(0) / 24} days ago`

                        :

                        `${(parseInt(new Date() - new Date(dateAdded)) / (1000 * 60 * 60)).toFixed(0)} hours ago`

                }</p>
                <p className='font-semibold' name="sname">By: {sname}</p>
                <p className='font-semibold' name="location">Location: {upazila}, {district}</p>
                <p className='text-left' name="description">{description}</p>
                <p className='text-left text-xl font-semibold' name="price">Price: {price}Tk</p>
                <div className={`card-actions  mt-3 ${grid ? 'flex  ' : 'justify-end '}`}>


                    <div className='card-actions  mt-3 flex absolute bottom-20 right-5'>
                        <button onClick={() => handleBooking(book)} className="btn w-14 h-14 rounded-full btn-ghost text-neutral text-3xl  p-2"><GrFavorite /></button>
                    </div>

                    <div className='card-actions  mt-3 flex absolute bottom-5 right-5'>
                        <button onClick={() => handleBooking(book)} className="btn w-14 h-14 rounded-full btn-ghost text-neutral text-3xl  p-2"><BiAddToQueue /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;