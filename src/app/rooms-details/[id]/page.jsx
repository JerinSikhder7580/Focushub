'use client'
import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import { email } from 'better-auth';
import { CircleCheck, DollarSign, Layers, SquarePen, Trash2, Users } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import React, { useEffect, useState } from 'react';

const DetailsPage = () => {

    const { data } = authClient.useSession()
    const user = data?.user


    const { id } = useParams() // {id:theId}

    const [room, setRoom] = useState()
    const [authorData, setAuthorData] = useState()

    useEffect(() => {
        fetch(`http://localhost:5000/room/${id}`) // 
            .then((res) => res.json())
            .then((userData) => {
                setRoom(userData)
                console.log(userData)
                fetch(`http://localhost:5000/user?email=${userData.userEmail}`) // 
                    .then((res) => res.json())
                    .then((author) => {
                        setAuthorData(author)

                    })


            }
            )



    }, [])
    if (!room) {
        return

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
        <div className=' py-20'>
            <section>
                <div className='grid grid-cols-2 gap-10'>
                    <Image
                        src={room.image}
                        alt=''
                        width={1000}
                        height={800}
                        className='object-cover rounded'


                    />
                    <div>
                        <div className='flex justify-between items-start'>
                            <h1 className='text-5xl font-bold'>{room.roomName}</h1>
                        </div>
                        <p className='text-gray-600'>{room.description}</p>
                        <div className='grid grid-cols-3 gap-3 '>
                            <div className='bg-slate-100 p-4  rounded'>
                                <Layers strokeWidth={2.5} className='text-cyan-800' />
                                <h1 className='text-sm text-gray-600 mt-1.5 '>Floor</h1>
                                <p className='font-semibold text-lg'>{returnFloor(room.floor)} Floor</p>
                            </div>
                            <div className='bg-slate-100 p-4  rounded'>
                                <Users strokeWidth={2.5} className='text-cyan-800' />
                                <h1 className='text-sm text-gray-600 mt-1.5 '>Capacity</h1>
                                <p className='font-semibold text-lg'>{room.capacity} People</p>


                            </div>
                            <div className='bg-slate-100 p-4 rounded '>
                                <DollarSign strokeWidth={2.5} className='text-cyan-800' />
                                <h1 className='text-sm text-gray-600 mt-1.5 '>Rate</h1>
                                <p className='font-semibold text-lg'>${room.hourlyRate}/hr</p>

                            </div>

                        </div>

                        <h1 className='font-semibold text-lg py-2'>Amenities</h1>
                        <div className='flex gap-2 mb-3'>
                            {
                                room.amenities.map((aminity, index) =>
                                    <div className='flex gap-1 bg-slate-100 rounded px-2 items-center' key={index}>
                                        <CircleCheck className='text-cyan-600 ' size={14} />
                                        <h1>{aminity}</h1>

                                    </div>
                                )
                            }

                        </div>

                        {user?.email === room.userEmail ?
                            <div className='flex justify-between'>
                                <button className='flex gap-1 btn text-sky-800 bg-sky-100 border border-sky-200'> <SquarePen size={18} />Edit</button>
                                <button className='flex gap-1 btn text-red-500 bg-red-100 border border-red-200'> <Trash2 size={18} />Delete</button>
                            </div>
                            :
                            <button className='bg-cyan-600 btn w-full text-white'>Book Now</button>}

                        <div className='space-y-2'>
                            <h1 className='text-md font-bold mt-2 ml-3'>Listed by</h1>
                            <div className='flex items-center gap-3'>
                                <Avatar>
                                    <Avatar.Image referrerPolicy="no-referrer" alt="User Image" src={authorData?.image} />
                                    <Avatar.Fallback>{authorData?.name.charAt(0)}</Avatar.Fallback>
                                </Avatar>

                                <div>
                                    <h1 className='font-semibold text-md'>{authorData?.name}</h1>
                                    <p className='text-gray-600 text-sm'>{authorData?.email}</p>

                                </div>

                            </div>

                        </div>
                    </div>




                </div>
            </section>
        </div>
    );
};

export default DetailsPage;