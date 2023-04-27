import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { GiBookshelf } from 'react-icons/gi';
import { RiComputerFill } from 'react-icons/ri';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { motion } from 'framer-motion';


const CategoryList = () => {


    const { categories, user } = useContext(AuthContext)



    return (
        <div className={`container mx-auto ${user ? "lg:my-20" : "lg:my-24"}`}>
            <div className=" mb-5 bg-transparent rounded-xl mx-2 lg:mx-auto text-center mb-20">
                <span className='font-bold text-5xl text-neutral underline decoration-neutral '>Categories</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 justify-items-center  lg:gap-12 gap-5 px-5 ">

                {
                    categories &&
                    categories?.map(category =>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} key={category._id} className={`card lg:w-52 w-full  lg:h-32 bg-transparent border-2 border-secondary `}>
                            <Link to={`/category/${category.id}`}>
                                <div className="card-body flex justify-center items-center text-center">
                                    <div className='flex justify-center'>
                                        <h2 className="card-title text-5xl text-secondary "><RiComputerFill /></h2>
                                    </div>
                                    <span class="relative text-neutral transition-colors duration-200 ease-in-out delay-100 group-hover:text-secondary text-neutral text-center capitalize font-bold ">{category.category}</span>
                                </div>
                            </Link>
                        </motion.div>
                    )
                }

            </div>




        </div>
    );
};

export default CategoryList;