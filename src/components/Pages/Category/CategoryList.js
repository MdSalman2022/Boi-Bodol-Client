import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { GiBookshelf } from 'react-icons/gi';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';


const CategoryList = () => {


    const { categories } = useContext(AuthContext)



    return (
        <div className=''>
            <div className="grid grid-cols-1 lg:grid-cols-5 justify-items-center  gap-5  ">

                {
                    categories &&
                    categories?.map(category =>
                        <div key={category._id} className="card w-64 bg-base-100 shadow-xl border border-neutral hover:scale-105 transition-all duration-300 ease-in-out">
                            <div className="card-body flex justify-center items-center">
                                <h2 className="card-title text-5xl text-neutral"><GiBookshelf /></h2>
                                <div className="card-actions justify-center">



                                    <Link to={`/category/${category.id}`}>
                                        <button class="relative inline-flex items-center justify-center px-3 py-2 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group mt-5">
                                            <span class="absolute inset-0 w-full h-10 mt-1 ml-1 transition-all duration-300 ease-in-out bg-neutral rounded-md group-hover:mt-0 group-hover:ml-0"></span>
                                            <span class="absolute inset-0 w-full h-10 bg-white rounded-md "></span>
                                            <span class="absolute inset-0 w-full h-10 transition-all duration-200 ease-in-out delay-100 bg-neutral rounded-md opacity-0 group-hover:opacity-100 "></span>
                                            <span class="relative text-neutral transition-colors duration-200 ease-in-out delay-100 group-hover:text-white capitalize ">{category.category}</span>
                                        </button>

                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>




        </div>
    );
};

export default CategoryList;