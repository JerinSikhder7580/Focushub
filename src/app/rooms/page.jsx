/* eslint-disable @next/next/no-img-element */
"use client"

import { Button } from '@heroui/react';
import { Eye, Layers, Search, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const AllRoomsPage = () => {

    const [rooms, setRooms] = useState([...Array(1)])
    console.log(rooms)

    useEffect(() => {

        fetch("https://focushub-server.vercel.app/rooms")
            .then((res) => res.json())
            .then(data => setRooms(data))

    }, [])

    const handleSearch = (e) => {
        e.preventDefault()

        const value = e.target.value

        fetch(`https://focushub-server.vercel.app/rooms?roomName=${value}`)
            .then((res) => res.json())
            .then((roomData) => {
                setRooms(roomData)
            })
    }

    const handleFilter = (e) => {
        e.preventDefault()

        const amenities = e.target.amenities.value
        const min = e.target.min.value
        const max = e.target.max.value

        fetch(`https://focushub-server.vercel.app/rooms?amenities=${amenities}&min=${min}&max=${max}`)
            .then((res) => res.json())
            .then(data => {
                setRooms(data)
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
        <div className='bg-slate-100 min-h-screen'>
            <section className='px-4 sm:px-6 py-10'>

                {/* Header */}
                <div>
                    <h2 className='font-bold text-cyan-800 tracking-wider uppercase pt-5'>
                        All Rooms
                    </h2>

                    <h1 className='text-3xl sm:text-4xl font-bold text-cyan-950 mb-3'>
                        Available Rooms
                    </h1>

                    <p className='text-gray-500 leading-6 max-w-3xl'>
                        Browse all available study rooms, search by room name,
                        and filter by amenities or hourly rate to find your perfect space.
                    </p>
                </div>

                {/* Layout */}
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-5 mt-10'>

                    {/* Sidebar */}
                    <div className='lg:col-span-1 shadow-sm rounded-lg p-4 h-max lg:sticky lg:top-5 bg-slate-50'>

                        {/* Search */}
                        <form>

                            <div className='p-2'>

                                <label className='block text-sm text-gray-500 mb-2'>
                                    Search by name
                                </label>

                                <label className='input border-none input-info w-full'>

                                    <Search size={18} />

                                    <input
                                        onChange={handleSearch}
                                        type="text"
                                        className='w-full'
                                        placeholder='Search'
                                    />
                                </label>
                            </div>
                        </form>

                        {/* Filter */}
                        <h1 className='p-2 font-semibold'>
                            Amenities
                        </h1>

                        <form onSubmit={handleFilter}>

                            <ul className='space-y-2'>

                                {
                                    [
                                        "Whiteboard",
                                        "Projector",
                                        "Wi-Fi",
                                        "Power Outlets",
                                        "Quiet Zone",
                                        "Air Conditioning"
                                    ].map((amenity, index) =>

                                        <li
                                            className='flex gap-2 items-center'
                                            key={index}
                                        >
                                            <input
                                                className='radio radio-info'
                                                type="radio"
                                                name='amenities'
                                                value={amenity}
                                            />

                                            {amenity}
                                        </li>
                                    )
                                }

                            </ul>

                            <h1 className='mt-5 mb-2 font-semibold'>
                                Hourly rate($)
                            </h1>

                            <div className='grid grid-cols-2 gap-2 mb-4'>

                                <input
                                    className='bg-slate-200 p-2 rounded'
                                    type="text"
                                    placeholder='Min'
                                    name='min'
                                />

                                <input
                                    className='bg-slate-200 p-2 rounded'
                                    type="text"
                                    placeholder='Max'
                                    name='max'
                                />
                            </div>

                            <Button
                                type='submit'
                                className={'rounded-none w-full'}
                            >
                                Filter
                            </Button>
                        </form>
                    </div>

                    {/* Cards */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:col-span-3'>

                        {
                            rooms.map((room, index) =>

                                <div
                                    className='rounded-2xl overflow-hidden h-auto flex flex-col shadow bg-slate-50'
                                    key={index}
                                >

                                    {/* Image */}
                                    {
                                        room ?

                                            <Image
                                                src={room?.image}
                                                alt=''
                                                className='object-cover w-full h-56'
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
                </div>
            </section>
        </div>
    );
};

export default AllRoomsPage;