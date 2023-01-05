import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const AllProducts = () => {

    const { user } = useContext(AuthContext)
    let [allProducts, setAllProducts] = useState([])


    const [id, setId] = useState('')



    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_SERVER_LINK}/allproducts`)
    //         .then(res => res.json())
    //         .then(data => setAllProducts(data))
    // }, [id, allProducts])



    const { data: products = [] } = useQuery({
        queryKey: ['allproducts'],
        queryFn: () => fetch(`${process.env.REACT_APP_SERVER_LINK}/allproducts`)
            .then(res => res.json())
    }, [id, allProducts])

    allProducts = products;

    console.log(allProducts)



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
                        const remainingProducts = allProducts?.filter(product => product._id !== data._id)
                        setId(data._id)
                        setAllProducts(remainingProducts)
                    }
                })
        }
    }



    return (
        <div>
            <h1 className="text-3xl my-5 text-center font-semibold">Products</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className=''>
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
                        {allProducts &&
                            allProducts.map((myProduct, index) =>
                                <tr key={myProduct._id}>
                                    <th>{index + 1}</th>
                                    <td>{myProduct.name}</td>
                                    <td>{myProduct.price}</td>
                                    <td>{myProduct.email}</td>
                                    <td>{myProduct.sold ? 'Sold' : "Available"}</td>
                                    <td>
                                        <button onClick={() => handleDelete(myProduct)} className="btn   btn-error">Delete</button>
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

export default AllProducts;