import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import { FaTrashAlt } from 'react-icons/fa';

const MyProducts = () => {

    const { user } = useContext(AuthContext)
    const [myProducts, setMyProducts] = useState('')


    const [id, setId] = useState('')



    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/myproducts?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setMyProducts(data))
    }, [user?.email, id, myProducts])




    const handleAvailable = id => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/myproducts/${id} `, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    console.log(data)
                    setId(id)
                }
            })
    }





    const handleDelete = data => {
        const permission = window.confirm(`Are you sure you want to delete: ${data.name} `)

        if (permission) {
            fetch(`${process.env.REACT_APP_SERVER_LINK}/products/${data._id} `, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success('Product Deleted Successfully')
                        const remainingProducts = myProducts?.filter(product => product._id !== data._id)
                        setMyProducts(remainingProducts)
                    }
                })
        }
    }


    return (
        <div>
            <h1 className="text-3xl my-5 text-center font-semibold">My Products</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='bg-secondary text-accent' ></th>
                            <th className='bg-secondary text-accent' >Name</th>
                            <th className='bg-secondary text-accent' >Price</th>
                            <th className='bg-secondary text-accent' >Email</th>
                            <th className='bg-secondary text-accent' >Status</th>
                            <th className='bg-secondary text-accent' >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myProducts &&
                            myProducts.map((myProduct, index) =>
                                <tr key={myProduct._id}>
                                    <th>{index + 1}</th>
                                    <td>{myProduct.name}</td>
                                    <td>{myProduct.price}</td>
                                    <td>{myProduct.email}</td>
                                    <td>{myProduct.sold ? 'Sold' : "Available"}</td>
                                    <td>
                                        <button disabled={myProduct.sold} onClick={() => handleAvailable(myProduct._id)} className="btn btn-success mr-2">Sold</button>

                                        <button onClick={() => handleDelete(myProduct)} className="btn   btn-error"><FaTrashAlt /></button>
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

export default MyProducts;