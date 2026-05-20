/* eslint-disable @next/next/no-img-element */
"use client"
import FocusContext from '@/context/FocusContext';
import { ArrowRight, Plus } from 'lucide-react';
import Image from 'next/image';
import React, { useContext } from 'react';
import CountUp from 'react-countup';
import { BiRightArrow } from 'react-icons/bi';

const Banner = () => {
    const data = useContext(FocusContext)
    console.log(data)
    return (
        <div className='bg-slate-100 dark:bg-[#0d1322] min-h-[80dvh] flex items-center '>
            <section>
                <div className='flex gap-10'>
                    <div className='w-1/2 space-y-5'>
                        <h6 className='bg-white  dark:bg-[#0b1120]  inline-block px-3 py-1 rounded-full font-semibold text-cyan-700 dark:text-cyan-400 '>Ready for room bookings</h6>
                        <h1 className='text-7xl font-bold tracking-wider text-black dark:text-white'>Find Your Perfect Study Room</h1>
                        <p className='dark:text-white/70'>Browse quiet, private study rooms near you for focused learning. Create and manage your own room, book instantly, and stay productive while achieving your goals.</p>
                        <div className='flex gap-5'>
                            <button className='btn bg-sky-700 dark:bg-sky-500 text-white dark:text-black dark:border-none dark:shadow-none  '>All Rooms <ArrowRight /></button>
                            <button className='btn bg-white dark:bg-[#070c1a] text-black dark:text-white flex items-center border-none shadow'>Add Room <Plus size={18} /> </button>
                        </div>
                        <div className='grid grid-cols-3 gap-5 *:bg-white dark:*:bg-[#070c1a]   rounded'>
                            <div className='p-5 rounded shadow border border-white/20'>
                                <h1 className='text-2xl font-bold dark:text-white'><CountUp end={47} />+</h1>
                                <p className='text-gray-500 font-medium dark:text-gray-300'>Rooms</p>
                            </div>
                            <div className='p-5 rounded shadow border border-white/20'>
                                <h1 className='text-2xl font-bold dark:text-white'><CountUp
                                    end={1.6}
                                    decimals={1}
                                    duration={3}
                                />k</h1>
                                <p className='text-gray-500 font-medium dark:text-gray-300'>Bookings</p>
                            </div>
                            <div className='p-5 rounded shadow border border-white/20'>
                                <h1 className='text-2xl font-bold dark:text-white'><CountUp
                                    end={4.8}
                                    decimals={1}
                                    duration={3}
                                /></h1>
                                <p className='text-gray-500 font-medium dark:text-gray-300'>Rating</p>
                            </div>
                        </div>
                    </div>
                    <Image
                        className='rounded'
                        src={'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=85'}
                        alt='banner image'
                        height={660}
                        width={660}



                    />




                </div>
            </section>
        </div>
    );
};

export default Banner;