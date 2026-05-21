"use client"
// import { BookingCancelAlert } from '@/components/BookingCancelAlert';
import { authClient } from '@/lib/auth-client';
import { format } from 'date-fns';
import { CalendarDays, Clock, DollarSign, Mail, StickyNote } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyBookingsPage = () => {
    const user = authClient.useSession()
    const userId = user?.data?.user?.id
    console.log(userId)


    const [bookingsData, setBookingsData] = useState([])

    const now = new Date()
    console.log(now)


    useEffect(() => {

        if (!userId) return

        fetch(`http://localhost:5000/booking/${userId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBookingsData(data)
            })

    }, [userId])




    const handleCancelBooking = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                toast.promise(
                    fetch(`http://localhost:5000/booking/${id}`, {
                        method: "DELETE",
                        headers: {
                            "content-type": "application/json"
                        },
                    })
                        .then((res) => res.json())
                        .then(data => {
                            if (data.deletedCount !== 1) {
                                throw new Error('Cancel Failed')
                            }
                        })
                    ,



                    {
                        loading: "Canceling",
                        success: () => {

                            const newResult = bookingsData.filter((item) => item._id != id)
                            setBookingsData(newResult)
                            return "Canceled Successfully"

                        },
                        error: (err) => err.message || "Something went wrong"

                    }
                )
            }
        });


    }

    return (
        <div className='bg-slate-100 min-h-screen'>
            <Toaster/>
            <section className='py-10'>

                <div className='mb-8'>
                    <h2 className='font-bold text-cyan-800 tracking-wider uppercase pt-5'>
                        My Bookings
                    </h2>

                    <h1 className='text-3xl sm:text-4xl font-bold text-cyan-950'>
                        Reserved Rooms
                    </h1>



                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {
                        bookingsData.map((booking) =>
                            <div
                                className='bg-white rounded-lg shadow-sm overflow-hidden flex flex-col'
                                key={booking?._id}
                            >
                                <Image
                                    src={booking?.roomImage || "/Banner.jpeg"}
                                    alt={booking?.roomName || "Booked room"}
                                    className='w-full h-56 object-cover'
                                    width={600}
                                    height={360}
                                />

                                <div className='p-5 flex flex-col flex-1'>
                                    <div className='flex items-start justify-between gap-3 mb-4'>
                                        <div>
                                            <h2 className='text-xl font-semibold text-cyan-950'>
                                                {booking?.roomName}
                                            </h2>

                                            <p className='text-sm text-gray-500'>
                                                Booked on {format(new Date(booking?.bookedAt), "dd MMM, yyyy")}
                                            </p>
                                        </div>




                                        <div className='flex items-center gap-1 bg-cyan-50 text-cyan-800 font-semibold px-3 py-1 rounded-full'>
                                            <DollarSign size={16} />
                                            <span>{booking?.cost}</span>
                                        </div>
                                    </div>

                                    <div className='space-y-3 text-gray-700'>
                                        <div className='flex items-center gap-3'>
                                            <CalendarDays className='text-cyan-700 shrink-0' size={20} />
                                            <span>{format(new Date(booking?.date), "dd MMM, yyyy")}</span>
                                        </div>

                                        <div className='flex items-center gap-3'>
                                            <Clock className='text-cyan-700 shrink-0' size={20} />
                                            <span>{format(new Date(booking?.startTime), "p")} - {format(new Date(booking?.endTime), "p")}</span>
                                        </div>

                                        <div className='flex items-center gap-3'>
                                            <Mail className='text-cyan-700 shrink-0' size={20} />
                                            <span className='break-all'>{booking?.userEmail}</span>




                                        </div>

                                        {
                                            booking?.note &&

                                            <div className='flex items-start gap-3'>
                                                <StickyNote className='text-cyan-700 shrink-0 mt-1' size={20} />
                                                <p className='leading-6'>{booking?.note}</p>
                                            </div>
                                        }
                                    </div>

                                    <div className='flex-1'></div>

                                    <button onClick={() => handleCancelBooking(booking._id)} className='btn btn-primary w-full mt-5'>
                                        Cancel Booking
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>




                {
                    !bookingsData[0] &&

                    <div className='bg-white text-center rounded-lg shadow-sm p-10'>
                        <h2 className='text-xl font-semibold text-cyan-950'>
                            No bookings found
                        </h2>

                        <p className='text-gray-500 mt-2'>
                            Your reserved rooms will appear here.
                        </p>
                    </div>
                }

            </section >
        </div >
    );


    
};

export default MyBookingsPage;
