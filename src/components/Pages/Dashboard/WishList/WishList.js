import React, { useContext, useEffect, useState } from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const WishList = () => {

    const { user } = useContext(AuthContext)
    const [cart, setCart] = useState([])

    //filtering orders by email
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/wishlist?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setCart(data))
    }, [user?.email])


    return (
        <div>
            <h1 className="text-3xl my-5 text-center font-semibold">Cart</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Email</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart &&
                            cart?.map((product, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td><LazyLoadImage src={product.img} alt="" className='w-20 rounded-xl' /></td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.email}</td>
                                    <td>{product.time}</td>
                                    <td>{product.sold ? "Sold" : "Available"}</td>
                                    <td>
                                        <Link to={`/details/${product.pId}`}>
                                            <div class="b mx-auto h-20 w-20 flex justify-center items-center">
                                                <div class="i h-12 w-12 bg-white  items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-110 transition duration-300 ease-out">
                                                </div>
                                                <button class="text-center text-neutral font-semibold z-10 pointer-events-none">
                                                    <MdRemoveRedEye className='text-2xl ' />
                                                </button>
                                            </div>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WishList;