import React, { useContext, useEffect, useState } from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import { animateScroll as scroll } from 'react-scroll'


const WishList = () => {

    const { user } = useContext(AuthContext)
    const [cart, setCart] = useState([])

    //filtering orders by email
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/wishlist?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setCart(data))
    }, [user?.email, cart])


    const scrolltop = () => {
        scroll.scrollToTop();
    }

    return (
        <div>
            <h1 className="text-3xl my-5 text-center font-semibold">Cart</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className=''>
                        <tr>
                            <th className='bg-secondary text-accent'></th>
                            <th className='bg-secondary text-accent'>Image</th>
                            <th className='bg-secondary text-accent'>Name</th>
                            <th className='bg-secondary text-accent'>Price</th>
                            <th className='bg-secondary text-accent'>Email</th>
                            <th className='bg-secondary text-accent'>Time</th>
                            <th className='bg-secondary text-accent'>Status</th>
                            <th className='bg-secondary text-accent'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart &&
                            cart?.map((product, index) =>
                                <tr key={product._id}>
                                    <th>{index + 1}</th>
                                    <td><LazyLoadImage src={product.img} alt="" className='w-20 rounded-xl' /></td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.email}</td>
                                    <td>{product.time}</td>
                                    <td>{product.sold ? "Sold" : "Available"}</td>
                                    <td>
                                        <Link to={`/details/${product.pId}`} onClick={scrolltop}>
                                            <div className="b mx-auto h-20 w-20 flex justify-center items-center">
                                                <div className="i h-12 w-12 bg-white  items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-110 transition duration-300 ease-out">
                                                </div>
                                                <button className="text-center text-secondary font-semibold z-10 pointer-events-none">
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