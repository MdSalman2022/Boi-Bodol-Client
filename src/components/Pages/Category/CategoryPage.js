import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { GoVerified } from 'react-icons/go';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../ProductCard/ProductCard';


const CategoryPage = () => {

    const { grid } = useContext(AuthContext)

    const books = useLoaderData()

    return (
        <div className='mx-auto max-w-screen-2xl '>
            <h1 className='text-5xl text-center font-bold mb-10'>{books[0].category}</h1>
            <div className={`${grid ? 'grid grid-cols-4 gap-5 justify-items-center' : 'flex justify-center flex-wrap gap-5'} `} >
                {
                    books?.map(book => <ProductCard book={book} key={book._id} ></ProductCard>)
                }
            </div>
        </div>
    );
};

export default CategoryPage;