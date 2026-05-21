'use client'
import FocusContext from '@/context/FocusContext';
import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import { email, object } from 'better-auth';
import { error } from 'better-auth/api';
import { Calendar, CircleCheck, Clock, DollarSign, Layers, SquarePen, Trash2, Users } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import React, { useContext, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const DetailsPage = () => {


    const { id } = useParams()


    const { data } = authClient.useSession()
    const user = data?.user


    const amenitiesOptions = [
        "Whiteboard",
        "Projector",
        "Wi-Fi",
        "Power Outlets",
        "Quiet Zone",
        "Air Conditioning",
    ];
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [amenities, setAmenities] = useState([])



    const [room, setRoom] = useState()
    console.log(room)
    const [authorData, setAuthorData] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [totalCost, setTotalCost] = useState(0)
    const [timeError, setTimeError] = useState()
    const [token, setToken] = useState()




    useEffect(() => {
        const getToken = async () => {

            const { data: tokenData } = await authClient.token()
            setToken(tokenData.token)

            fetch(`http://localhost:5000/room/${id}`, {
                // method: "GET",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${tokenData.token}`
                }
            })
                .then((res) => res.json())
                .then((userData) => {
                    setAmenities(userData.amenities)
                    setRoom(userData)
                    console.log(userData)
                    fetch(`http://localhost:5000/user?email=${userData.userEmail}`) // 
                        .then((res) => res.json())
                        .then((author) => {
                            setAuthorData(author)

                        })


                }
                )

        }

        getToken()



    }, [])



    const modalElement = useRef()
    const editModal = useRef()

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



    const calculateRate = (value, time) => {
        let start
        let end
        if (time === "startTime") {
            start = value
            setStartTime(value)

        }
        else if (time === "endTime") {
            end = value
            setEndTime(value)
        }
        const finalStartTime = start || startTime || 0
        const finalEndTime = end || endTime || 0
        console.log(finalStartTime, finalEndTime)
        if (finalStartTime > finalEndTime) {
            return setTotalCost(0)
        }
        const totalTime = Number(finalEndTime) - Number(finalStartTime)
        setTotalCost(totalTime * 5)
    }




    const handleBooking = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        console.log(data)

        //  var 
        // let 
        // const
        // state .............

        data.roomId = room._id
        data.userEmail = user?.email
        data.bookedAt = new Date()
        data.cost = totalCost

        if (Number(startTime) >= Number(endTime)) {
            return setTimeError('End time must be after start time')

        }


        toast.promise(




            fetch("http://localhost:5000/booking", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)

            }).then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data.error) {
                        throw new Error(data.error)
                    }
                    if (!data.insertedId) {
                        throw new Error("Can't Booked Room")
                    }
                })
            ,


            {
                loading: 'Booking...',
                success: () => {
                    modalElement.current.close()
                    return "Room Booked Successfully!"
                },
                error: (err) => {
                    modalElement.current.close()
                    return err.message || "Something went wrong!"
                },
            }
        );



    }
    const handleCheckbox = (e) => {
        const value = e.target.value
        if (e.target.checked) {
            setAmenities([...amenities, e.target.value])
        }
        else {
            const temp = amenities.filter((amenity) => amenity !== value)
            setAmenities(temp)
        }
        // array.filter((value)=>condition)
    }





    const handleEdit = async (e) => {
        e.preventDefault()
        editModal.current.close()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        data.amenities = amenities
        data.roomId = room._id
        console.log(data)



        toast.promise(
            fetch("http://localhost:5000/booking", {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    if (data.modifiedCount !== 1) {
                        throw new Error("Update Failed")

                    }
                })
            ,
            {
                loading: "Updating",
                success: () => {
                    setRoom(data)
                    return "Updated"
                }, // server respond
                error: (err) => err.message || "Something went wrong" // server not responding

            }
        )


    }
    // console.log(amenities)

    
    const handleDelete = () => {



        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // js pora suru korteche  

                fetch(`http://localhost:5000/room/${room._id}`,{
                    method:"DELETE",
                    headers:{
                        "content-type":"application/json"
                    }

                })

                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });


    }



    // modalElement.current.close()


    return (
        <div className=' py-20'>
            <Toaster />
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
                        <div className='flex gap-2 mb-3 flex-wrap'>
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
                                <button onClick={() => editModal.current.showModal()} className='flex gap-1 btn text-sky-800 bg-sky-100 border border-sky-200'> <SquarePen size={18} />Edit</button>
                                <button onClick={handleDelete} className='flex gap-1 btn text-red-500 bg-red-100 border border-red-200'> <Trash2 size={18} />Delete</button>
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
                                    <select onChange={(e) => { calculateRate(e.target.value, "startTime") }} required className='select flex-row pl-5' name="startTime" >
                                        {
                                            [...Array(24)].map((_, index) => // undefined
                                                <option key={index} value={index}>{`${index < 10 ? 0 : ""}${index}`}:00</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label className='flex gap-1'><Clock /> End Time</label>
                                    <select onChange={(e) => { calculateRate(e.target.value, "endTime") }} required className='select flex-row pl-5' name="endTime" >
                                        {
                                            [...Array(24)].map((_, index) => // undefined
                                                <option key={index} value={index}>{`${index < 10 ? 0 : ""}${index}`}:00</option>
                                            )
                                        }
                                    </select>

                                </div>
                            </div>
                            <div className=' space-y-2'>
                                <label className='flex gap-1'> <Calendar />Pick Your Date</label>
                                <input required type="date" className="input w-full" name='date' />
                            </div>

                            <fieldset>
                                <label className='block'>Special Note</label>
                                <textarea required className='textarea w-full' name="note" ></textarea>
                            </fieldset>
                            <div className='flex justify-between p-5 rounded-xl bg-slate-100'>
                                <h1 className='font-bold text-xl'> <span className='text-cyan-400 '>$</span>Total Cost</h1>
                                <h2>$<span>{totalCost}</span> </h2>
                            </div>
                            <button className='bg-sky-700 btn w-full text-white mt-2'>Confirm Booking</button>





                        </form>



                    </div>
                </dialog>


                {/* edit modal */}


                <dialog ref={editModal} className="modal">
                    <div className="modal-box max-w-2xl dark:bg-black">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white">✕</button>
                        </form>
                        <h1 className='text-center text-xl text-cyan-800 dark:text-white font-bold'>Edit your room details</h1>

                        <Image
                            src={room.image}
                            alt='room image'
                            width={400}
                            height={260}
                            className='object-cover w-full h-65 rounded-md mt-4 mb-2'


                        />
                        <form onSubmit={handleEdit} className="space-y-6">
                            {/* Room Name */}
                            <div>

                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Room Name
                                </label>

                                <input
                                    type="text"
                                    name="roomName"
                                    required
                                    placeholder="Enter room name"
                                    defaultValue={room.roomName}
                                    className="w-full rounded-xl border border-zinc-700 bg-white text-black dark:text-white dark:bg-zinc-800 px-4 py-3 outline-none transition-all focus:border-cyan-400"
                                />
                            </div>


                            {/* Image URL */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Image URL
                                </label>

                                <input
                                    type="url"
                                    name="image"
                                    placeholder="https://example.com/image.jpg"
                                    defaultValue={room.image}
                                    className="w-full rounded-xl border border-zinc-700 bg-white text-black dark:text-white dark:bg-zinc-800 px-4 py-3 outline-none transition-all focus:border-cyan-400"
                                />
                            </div>

                            {/* Floor & Capacity */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                        Floor
                                    </label>

                                    <input
                                        type="number"
                                        name="floor"
                                        placeholder="3rd Floor"
                                        defaultValue={room.floor}
                                        className="w-full rounded-xl border border-zinc-700 bg-white text-black dark:text-white dark:bg-zinc-800 px-4 py-3 outline-none transition-all focus:border-cyan-400"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                        Capacity
                                    </label>

                                    <input
                                        type="number"
                                        name="capacity"
                                        min="1"
                                        placeholder="4"
                                        defaultValue={room.capacity}
                                        className="w-full rounded-xl border border-zinc-700 bg-white text-black dark:text-white dark:bg-zinc-800 px-4 py-3 outline-none transition-all focus:border-cyan-400"
                                    />
                                </div>
                            </div>

                            {/* Hourly Rate */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                                    Hourly Rate ($)
                                </label>

                                <input
                                    type="number"
                                    name="hourlyRate"
                                    min="1"
                                    placeholder="5"
                                    defaultValue={room.hourlyRate}
                                    className="w-full rounded-xl border border-zinc-700 bg-white text-black dark:text-white dark:bg-zinc-800 px-4 py-3 outline-none transition-all focus:border-cyan-400"
                                />
                            </div>

                            {/* Amenities */}
                            <div>
                                <label className="mb-4 block text-sm font-medium dark:text-white">
                                    Amenities
                                </label>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    {amenitiesOptions.map((item) => (
                                        <label
                                            key={item}
                                            className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-700 bg-white dark:text-white text-black dark:bg-zinc-800 px-4 py-3 transition-all hover:border-cyan-400"
                                        >
                                            <input
                                                type="checkbox"
                                                value={item}

                                                defaultChecked={room.amenities.includes(item)}
                                                onChange={handleCheckbox}
                                                className="h-4 w-4 accent-cyan-400"
                                            />

                                            <span>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {/* Description */}
                            <div>
                                <label className="mb-2 block text-black dark:text-white text-sm font-medium">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    required
                                    rows={2}
                                    placeholder="Write room details..."
                                    defaultValue={room.description}
                                    className="w-full rounded-xl border border-zinc-700 text-black  dark:text-white bg-white dark:bg-zinc-800 px-4 py-3 outline-none transition-all focus:border-cyan-400 placeholder:text-gray-500"
                                />
                            </div>


                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full rounded-xl text-white bg-cyan-800 px-6 py-3 text-lg font-semibold  transition-all hover:bg-cyan-300"
                            >
                                Update
                            </button>
                        </form>

                    </div>
                </dialog>
            </section>
        </div>
    );
};

export default DetailsPage;