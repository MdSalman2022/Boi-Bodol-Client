import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { GoVerified } from 'react-icons/go';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../ProductCard/ProductCard';
import { motion } from 'framer-motion';


const CategoryPage = () => {

    const { grid } = useContext(AuthContext)

    const books = useLoaderData()

    return (
        <motion.div className='mx-auto max-w-screen-2xl '
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1 className='text-5xl text-center font-bold mb-10'>{books[0]?.category}</h1>
            <div className={`${grid ? `grid ${books.length === 0 ? "lg:grid-cols-1 h-screen items-center lg:pb-52" : "lg:grid-cols-4"} gap-5 lg:gap-14 justify-items-center` : 'flex justify-center flex-wrap gap-5'} `} >
                {
                    books.length === 0 ?
                        <h1 className='text-5xl text-center font-bold mb-10 opacity-40'>No Book Found</h1>
                        :
                        books?.map(book => <ProductCard book={book} key={book._id} ></ProductCard>)
                }
            </div>
        </motion.div>
    );
};

export default CategoryPage;