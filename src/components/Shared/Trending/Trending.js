import React from 'react';

const Trending = () => {
    return (
        <div className='text-center'>
            <div className='grid grid-cols-3 mx-auto  justify-items-center '>
                <div className="card card-compact w-96 bg-base-100 shadow-xl border border-primary">
                    <figure className='p-2 '><img className='rounded-lg shadow-md ' src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-neutral text-secondary">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl border border-primary">
                    <figure className='p-2 '><img className='rounded-lg shadow-md ' src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-neutral text-secondary">Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl border border-primary">
                    <figure className='p-2 '><img className='rounded-lg shadow-md ' src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-neutral text-secondary">Buy Now</button>
                        </div>
                    </div>
                </div>

            </div>
            <button className="btn btn-outline btn-neutral hover:bg-neutral my-10">See More</button>

        </div>
    );
};

export default Trending;