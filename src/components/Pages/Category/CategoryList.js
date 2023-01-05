import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { GiBookshelf } from 'react-icons/gi';
import { RiComputerFill } from 'react-icons/ri';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';


const CategoryList = () => {


    const { categories } = useContext(AuthContext)



    return (
        <div className='container mx-auto my-44'>
            <div className=" mb-5 bg-transparent rounded-xl mx-2 lg:mx-auto text-center">
                <span className='font-bold text-5xl text-neutral underline decoration-neutral '>Categories</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-6 justify-items-center  gap-12  ">

                {
                    categories &&
                    categories?.map(category =>
                        <div key={category._id} className="card w-96 lg:w-52 h-32 bg-transparent border-2 border-secondary   hover:scale-105 transition-all duration-300 ease-in-out">
                            <Link to={`/category/${category.id}`}>
                                <div className="card-body flex justify-center items-center text-center">
                                    <div className='flex justify-center'>
                                        <h2 className="card-title text-5xl text-secondary "><RiComputerFill /></h2>
                                    </div>
                                    <span class="relative text-neutral transition-colors duration-200 ease-in-out delay-100 group-hover:text-secondary text-neutral text-center capitalize font-bold ">{category.category}</span>
                                </div>
                            </Link>
                        </div>
                    )
                }

            </div>




        </div>
    );
};

export default CategoryList;