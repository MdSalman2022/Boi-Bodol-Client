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
                        <div key={category._id} className="card w-64 bg-base-100 shadow-xl border border-neutral">
                            <div className="card-body flex justify-center items-center">
                                <h2 className="card-title text-5xl"><GiBookshelf /></h2>
                                <div className="card-actions justify-center">
                                    <Link to={`/category/${category.category}`}><button type="button" className="mt-5 btn btn-outline btn-neutral font-semibold tracking-wide ">{category.category}</button></Link>
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