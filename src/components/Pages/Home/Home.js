import React from 'react';
import AllBooks from '../../Shared/AllBooks/AllBooks';
import Trending from '../../Shared/Trending/Trending';
import CategoryList from '../Category/CategoryList';
import SearchBox from '../SearchBox/SearchBox';
import Testimonial from './Testimonial';

const Home = () => {
    return (
        <div className="container mx-auto">
            <SearchBox></SearchBox>
            <div className=" py-8 bg-transparent rounded-xl mx-2 lg:mx-auto text-center">
                <span className='font-bold text-5xl text-[#000000] '>Trending Books</span>
            </div>
            <Trending />
            <div className=" py-8 bg-transparent rounded-xl mx-2 lg:mx-auto text-center">
                <span className='font-bold text-5xl text-[#000000] '>Category</span>
            </div>
            <CategoryList></CategoryList>
            <div className=" py-8 bg-transparent rounded-xl mx-2 lg:mx-auto text-center">
                <span className='font-bold text-5xl text-[#000000] '>All Books</span>
            </div>
            <AllBooks />
            <Testimonial />
        </div>
    );
};

export default Home;