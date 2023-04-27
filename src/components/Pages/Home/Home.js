import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import AllBooks from '../../Shared/AllBooks/AllBooks';
import HeroSection from '../../Shared/HeroSection/HeroSection';
import Trending from '../../Shared/Trending/Trending';
import CategoryList from '../Category/CategoryList';
import Testimonial from './Testimonial';
import { motion, useScroll } from 'framer-motion';
import { animateScroll as scroll } from 'react-scroll'


const Home = () => {
    const { scrollYProgress } = useScroll();

    const scrolltop = () => {
        scroll.scrollToTop();
    }

    return (
        <motion.div className=" mx-auto "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="progress-bar bg-red-500"
                style={{ scaleX: scrollYProgress }}
            />
            <HeroSection />
            {/* <SearchBox></SearchBox> */}
            <div className="font-semibold text-center flex justify-center lg:hidden my-2 ">
                <LazyLoadImage src="https://i.ibb.co/1TxVmL3/boipaben-logo.png" className='w-40' alt="logo" border="0" />
            </div>

            <CategoryList></CategoryList>

            <Trending />
            <div className=" py-8 bg-transparent rounded-xl mx-2 lg:mx-auto text-center">
                <span className='font-bold text-5xl text-secondary underline decoration-neutral '>All Books</span>
            </div>
            <AllBooks />
            <div className='flex justify-center items-center'>
                <Link to="/allads" onClick={scrolltop}><button className="btn btn-neutral border-none text-white hover:bg-secondary my-10">See More</button></Link>
            </div>
            <Testimonial />
        </motion.div>
    );
};

export default Home;