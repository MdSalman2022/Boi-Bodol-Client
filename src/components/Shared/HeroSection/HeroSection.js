import React from 'react';

const HeroSection = () => {
    return (
        <div>
            <div className="hero min-h-96 bg-contain" style={{ backgroundImage: `url("https://i.ibb.co/0Mb0Z4k/book.jpg")` }}>
                <div className="hero-overlay bg-secondary bg-opacity-50 blur-md  backdrop-blur-sm py-80 "></div>
                <div className="hero-content text-center text-neutral-content flex flex-col ">
                    <h1 className='text-5xl text-white'>Got no place to keep your <span className="font-semibold text-neutral">old unnecessary</span> books?</h1>
                    <h1 className='text-5xl text-white'>Tired of <span className='text-neutral font-semibold'>searching</span> your desired book? </h1>
                    <h1 className='text-5xl text-white'>Can't <span className='font-semibold text-neutral '>Afford</span> to buy new ones? </h1>
                    <h1 className='text-5xl text-white animate-type'>Want to <span className="font-semibold text-neutral">exchange</span> your book to get the book your were <span className="text-neutral font-semibold">looking</span> for? </h1>
                    <h1 className='text-7xl font-bold text-neutral drop-shadow-lg'>You've come to the <span className='underline decoration-white'>right place</span></h1>

                    <div className="max-w-md text-white grid grid-cols-3 justify-items-center gap-52 mt-10">
                        <button className="w-52 mx-2 btn btn-neutral hover:btn-secondary text-secondary text-lg font-bold ">Buy Books</button>
                        <button className="w-52 mx-2 btn btn-neutral hover:btn-secondary text-secondary  text-lg font-bold">Sell Books</button>
                        <button className="w-52 mx-2 btn btn-neutral hover:btn-secondary text-secondary  text-lg font-bold">Exchange Books</button>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default HeroSection;