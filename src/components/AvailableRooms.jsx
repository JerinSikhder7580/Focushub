'use client'
import { Eye, EyeClosed, Layers, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const AvailableRooms = () => {
    const [availableRooms, setAvailableRooms] = useState()

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms?limit=6`)
            .then(res => res.json())
            .then(data => setAvailableRooms(data))
    }, [])
    const returnFloor = (num) => {
        const number = Number(num)

        if (number < 4) {
            if (number === 1) {
                return `${num}st`
            }
            else if (number === 2) {
                return `${num}nd`
            }
            else if (number === 3) {
                return `${num}rd`
            }
        }
        else {
            return `${num}th`
        }
    }
    return (
        <div className='p-6'>

            <section >
                <h1 className='text-center text-2xl font-semibold text-cyan-900 mb-3'>Available Rooms</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:col-span-3'>

                    {
                        availableRooms?.map((room, index) =>

                            <div
                                className='rounded-2xl overflow-hidden h-auto flex flex-col shadow bg-slate-50 group'
                                key={index}
                            >

                                {/* Image */}
                                {
                                    room ?

                                        <Image
                                            src={room?.image}
                                            alt=''
                                            className='object-cover w-full h-56 group-hover:scale-105 duration-300 '
                                            width={400}
                                            height={260}
                                        />

                                        :

                                        <Skeleton
                                            height={260}
                                            className='-translate-y-1'
                                        />
                                }

                                {/* Content */}
                                <div className='p-5 pb-0'>

                                    <div>

                                        <h1 className='font-semibold text-xl'>
                                            {room?.roomName || <Skeleton width={150} />}
                                        </h1>

                                        <p className='text-gray-700 mb-3'>
                                            {room?.description || <Skeleton width={180} />}
                                        </p>

                                    </div>

                                    {/* Info */}
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>

                                        {
                                            room ?

                                                <div className='flex gap-2 bg-slate-200 px-3 py-2 rounded'>

                                                    <Layers className='text-cyan-700' />

                                                    <h3>
                                                        {returnFloor(room?.floor)} Floor
                                                    </h3>

                                                </div>

                                                :

                                                <Skeleton height={40} />
                                        }

                                        {
                                            room ?

                                                <div className='flex gap-2 bg-slate-200 px-3 py-2 rounded'>

                                                    <Users className='text-cyan-700' />

                                                    <h3>
                                                        {room?.capacity} Seats
                                                    </h3>

                                                </div>

                                                :

                                                <Skeleton height={40} />
                                        }

                                    </div>

                                    {/* Amenities */}
                                    <div className='flex gap-3 flex-wrap my-4'>

                                        {
                                            room?.amenities.map((amenity, index) =>

                                                <span
                                                    className='text-cyan-800 font-semibold text-sm bg-sky-100 px-2 py-1 rounded-full'
                                                    key={index}
                                                >
                                                    {amenity}
                                                </span>
                                            )
                                        }

                                    </div>
                                </div>

                                <div className='flex-1'></div>

                                {/* Footer */}
                                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 p-5 pt-0'>

                                    {
                                        room ?

                                            <div>
                                                <h1 className='inline-block font-bold text-2xl'>
                                                    ${room?.hourlyRate}
                                                </h1>

                                                <span>/hr</span>
                                            </div>

                                            :

                                            <Skeleton width={55} height={30} />
                                    }

                                    {
                                        room ?

                                            <Link
                                                href={`/rooms-details/${room._id}`}
                                                className='btn bg-sky-700 text-white w-full sm:w-auto'
                                            >
                                                View Details
                                                <Eye size={18} />
                                            </Link>

                                            :

                                            <Skeleton width={129} height={40} />
                                    }

                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        </div>
    );
};

export default AvailableRooms;