"use client"

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const amenitiesOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
];

export default function AddRoomsPage() {

    const user = authClient.useSession()


    const router = useRouter();

    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const handleCheckbox = (item) => {
        if (selectedAmenities.includes(item)) {
            setSelectedAmenities(
                selectedAmenities.filter((a) => a !== item)
            );
        } else {
            setSelectedAmenities([...selectedAmenities, item]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const roomData = {
            roomName: form.roomName.value,
            description: form.description.value,
            image: form.image.value,
            floor: form.floor.value,
            capacity: Number(form.capacity.value),
            hourlyRate: Number(form.hourlyRate.value),
            amenities: selectedAmenities,
            userEmail: user?.data?.user?.email
        };




        toast.promise(
            fetch("http://localhost:5000/rooms", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(roomData)
            }).then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        router.push("/rooms")
                        return data

                    }
                    else {
                        throw new Error("Room Doesn't Added")
                    }
                }),
            {
                loading: "Saving",
                success: "Room Added Successfully!",
                error: (err) => err.message || "Something went wrong"

            }


        )




    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-zinc-950 px-4 py-10 text-white">
            <Toaster />
            <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-xl dark:shadow-2xl">
                <h1 className="mb-8 text-center text-4xl font-bold text-cyan-400">
                    Add New Room
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                                        checked={selectedAmenities.includes(item)}

                                        onChange={() => handleCheckbox(item)}
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
                            rows={5}
                            placeholder="Write room details..."
                            className="w-full rounded-xl border border-zinc-700 text-black  dark:text-white bg-white dark:bg-zinc-800 px-4 py-3 outline-none transition-all focus:border-cyan-400 placeholder:text-gray-500"
                        />
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-cyan-400 px-6 py-3 text-lg font-semibold text-black transition-all hover:bg-cyan-300"
                    >
                        Add Room
                    </button>
                </form>
            </div>
        </div>
    );
}