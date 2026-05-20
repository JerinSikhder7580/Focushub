'use client'
import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import { email, object } from 'better-auth';
import { CircleCheck, Clock, DollarSign, Layers, SquarePen, Trash2, Users } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import React, { useEffect, useRef, useState } from 'react';

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



    const modalElement = useRef()

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

    const calculateRate = () => {


    }




    const handleBooking = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        console.log(data)


        data.roomId = room._id
        data.userEmail = user.email
        data.bookedAt = new Date()


        fetch("http://localhost:5000/booking", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)

        })

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
                            <button onClick={() => modalElement.current.showModal()} className='bg-cyan-600 btn w-full text-white'>Book Now</button>}

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

                <dialog ref={modalElement} className="modal">
                    <div className="modal-box max-w-2xl ">
                        <div className='flex justify-between items-center'>
                            <div>

                                <h1 className='text-xl font-bold'>Book {room.roomName}</h1>
                                <p>Choose your preferred date and time to reserve this room for focused on goals.</p>
                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                            </div>
                        </div>

                        <form onSubmit={handleBooking} className='space-y-2'>
                            <div className=' grid grid-cols-2 gap-5'>
                                <div>
                                    <div className='flex gap-1' ><Clock /> Start Time</div>
                                    <select required className='select flex-row pl-5' name="startTime" >
                                        {
                                            [...Array(24)].map((_, index) => // undefined
                                                <option key={index}>{`${index < 10 ? 0 : ""}${index}`}:00</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label className='flex gap-1'><Clock /> End Time</label>
                                    <select required className='select flex-row pl-5' name="endTime" >
                                        {
                                            [...Array(24)].map((_, index) => // undefined
                                                <option key={index}>{`${index < 10 ? 0 : ""}${index}`}:00</option>
                                            )
                                        }
                                    </select>

                                </div>
                            </div>
                            <input required type="date" className="input w-full" name='date' />

                            <fieldset>
                                <label className='block'>Special Note</label>
                                <textarea required className='textarea w-full' name="note" ></textarea>
                            </fieldset>
                            <div className='flex justify-between p-5 rounded-xl bg-slate-100'>
                                <h1 className='font-bold text-xl'> <span className='text-cyan-400 '>$</span>Total Cost</h1>
                                <h2>$<span >0</span> </h2>
                            </div>
                            <button className='bg-sky-700 btn w-full text-white mt-2'>Confirm Booking</button>





                        </form>



                    </div>
                </dialog>
            </section>
        </div>
    );
};

export default DetailsPage;