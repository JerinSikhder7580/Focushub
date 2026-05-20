/* eslint-disable @next/next/no-img-element */
"use client"
import { Button } from '@heroui/react';
import { Eye, HousePlus, Layers, Search, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const AllRoomsPage = () => {

    const [rooms, setRooms] = useState([...Array(1)])

    useEffect(() => {

        fetch("http://localhost:5000/rooms")
            .then((res) => res.json())
            .then(data => setRooms(data))


    }, [])

    // console.log(rooms)



    const handleSearch = (e) => {
        e.preventDefault()
        const value = e.target.value

        console.log(value)
        fetch(`http://localhost:5000/rooms?roomName=${value}`)
            .then((res) => res.json())
            .then((roomData) => {
                setRooms(roomData)
                console.log(roomData)
            })

    }
    const handleFilter = (e) => {
        e.preventDefault()
        const amenities = e.target.amenities.value
        const min = e.target.min.value
        const max = e.target.max.value

        fetch(`http://localhost:5000/rooms?amenities=${amenities}&min=${min}&max=${max}`)
            .then((res) => res.json())
            .then(data => {
                setRooms(data)
                console.log(data)
            })



    }


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
        <div className='bg-slate-100'>
            <section>
                <div>
                    <h2 className='font-bold text-cyan-800 tracking-wider uppercase pt-10'>All Rooms</h2>
                    <h1 className='text-4xl font-bold text-cyan-950 mb-3'>Available Rooms</h1>
                    <p className='text-gray-500 leading-5 '>Browse all available study rooms, search by room name, and filter by amenities or hourly rate to find your perfect space.</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-4 gap-3 mt-10'>
                    <div className='col-span-1 shadow-sm  rounded-lg p-4 h-max sticky top-5 bg-slate-50'>

                        <form>
                            <div className='p-2'>

                                <label className='block text-sm text-gray-500'>
                                    Search ny name

                                </label>
                                {/* <div className='flex items-center border border-gray-500 rounded p-1'>
                                    <Search size={18} />

                                    <input onChange={handleSearch} className=' w-full px-2' type="text"
                                        placeholder='Search '
                                    />
                                </div> */}
                                <label className='input border-none input-info '>
                                    <Search size={18} />
                                    <input onChange={handleSearch} type="text" className=' ' placeholder='Search' />
                                </label>

                            </div>

                            {/* filter */}


                        </form>


                        <h1 className='p-2'>Amenities</h1>
                        <form onSubmit={handleFilter}>

                            <ul className=' space-y-1'>
                                {
                                    [
                                        "Whiteboard", "Projector", "Wi‑Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"
                                    ].map((amenity, index) =>
                                        <li className='flex gap-2' key={index}><input className='radio radio-info' type="radio" name='amenities' value={amenity} />{amenity}</li>
                                    )
                                }
                            </ul>

                            <h1 className=''>Hourly rate($)</h1>
                            <div className='grid grid-cols-2 gap-2 mb-2  '>
                                <input className='bg-slate-200 p-2' type="text" placeholder='Min' name='min' />
                                <input className='bg-slate-200 p-2' type="text" placeholder='Max' name='max' />

                            </div>
                            <Button type='submit' className={'rounded-none w-full'}>Filter</Button>
                        </form>





                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 col-span-3 '>

                        {
                            rooms.map((room, index) =>
                                <div className='rounded-2xl overflow-hidden  h-auto flex flex-col shadow  bg-slate-50' key={index}>
                                    {/* <div> */}
                                    {room ?
                                        <Image
                                            src={room?.image}
                                            alt=''
                                            className='object-cover w-full h-50 '
                                            width={400}
                                            height={260}


                                        /> :
                                        <Skeleton height={260} className='-translate-y-1 '></Skeleton>
                                    }
                                    <div className='p-5 pb-0'>
                                        <div>
                                            <h1 className='font-semibold text-xl'>{room?.roomName || <Skeleton width={150} />}</h1>
                                            <p className='text-gray-700 mb-3'>{room?.description || <Skeleton width={180}></Skeleton>}</p>
                                        </div>
                                        <div className='grid grid-cols-2 gap-3'>
                                            {room ?
                                                <div className='flex gap-2 bg-slate-200 px-3 py-2 rounded '>
                                                    <Layers className='text-cyan-700' />
                                                    <h3>{returnFloor(room?.floor)} Floor</h3>
                                                </div> :
                                                <Skeleton height={40}></Skeleton>
                                            }
                                            {room ?
                                                <div className='flex gap-2 bg-slate-200 px-3 py-2 rounded '>
                                                    <Users className='text-cyan-700' />
                                                    <h3>{room?.capacity} Seats</h3>
                                                </div> :
                                                <Skeleton height={40}></Skeleton>
                                            }
                                        </div>

                                        <div className='flex gap-3 flex-wrap my-4'>

                                            {
                                                room?.amenities.map((amenity, index) =>
                                                    <span className='text-cyan-800 font-semibold text-sm bg-sky-100 px-2 py-1 rounded-full' key={index}>{amenity}</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='flex-1 '></div>
                                    <div className='flex justify-between items-end p-5 pt-0'>
                                        {room ?
                                            <div >
                                                <h1 className='inline-block font-bold text-2xl'>${room?.hourlyRate}</h1><span>/hr</span>
                                            </div> :
                                            <Skeleton width={55} height={30}></Skeleton>

                                        }
                                        {room ?
                                            <Link href={`/rooms-details/${room._id}`} className='btn bg-sky-700 text-white'>View Details<Eye size={18} /></Link>
                                            :
                                            <Skeleton width={129} height={40}></Skeleton>
                                        }
                                    </div>

                                    {/* </div> */}
                                </div>
                            )

                        }
                    </div>

                    <div></div>
                </div>


            </section >
        </div >
    );
};

export default AllRoomsPage;