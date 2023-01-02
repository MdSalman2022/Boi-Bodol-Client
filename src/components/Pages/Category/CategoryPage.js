import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { GoVerified } from 'react-icons/go';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../ProductCard/ProductCard';


const CategoryPage = () => {

    const { grid } = useContext(AuthContext)

    const books = useLoaderData()

    return (
        <div className='mx-auto w-full max-w-max'>
            <h1 className='text-5xl text-center font-semibold'>{books[0].category}</h1>
            <div className='grid grid-cols-4 mt-5 justify-items-center  gap-5'>
                {
                    books?.map(book => <ProductCard book={book} key={book._id} grid={grid}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default CategoryPage;