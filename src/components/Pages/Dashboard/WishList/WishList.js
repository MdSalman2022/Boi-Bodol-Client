import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const WishList = () => {

    const { user } = useContext(AuthContext)
    const [cart, setCart] = useState('')

    //filtering orders by email
    useEffect(() => {
        fetch(`http://localhost:5000/bookedList?email=${user?.email}`)
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
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart &&
                            cart?.map((product, index) =>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td><img src={product.img} alt="" className='w-20 rounded-xl' /></td>
                                    <td>{product.pname}</td>
                                    <td>{product.price}</td>
                                    <td>{product.price}</td>
                                    <td>{product.email}</td>
                                    <td>
                                        <Link to={`/dashboard/payments/${product._id}`}>
                                            <button className="btn btn-primary mr-2">Pay</button>
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