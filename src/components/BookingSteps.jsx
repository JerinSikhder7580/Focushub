import { CalendarCheck, Search, UserCheck } from 'lucide-react';
import React from 'react';

const steps = [
    {
        icon: Search,
        title: "Choose a room",
        description: "Explore available rooms and compare the space, capacity, amenities, and hourly rate.",
    },
    {
        icon: CalendarCheck,
        title: "Pick your schedule",
        description: "Select the date, start time, and end time that match your study plan.",
    },
    {
        icon: UserCheck,
        title: "Confirm booking",
        description: "Add a note if needed and keep the booking saved in your personal bookings page.",
    },
]

const BookingSteps = () => {
    return (
        <div className='bg-slate-100 dark:bg-[#0d1322] py-16'>
            <section>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
                    <div>
                        <h2 className='font-bold text-cyan-800 dark:text-cyan-400 tracking-wider uppercase'>
                            Simple Process
                        </h2>

                        <h1 className='text-3xl sm:text-4xl font-bold text-cyan-950 dark:text-white mt-2'>
                            Book your room in three quick steps
                        </h1>
                    </div>

                    <div className='lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-5'>
                        {
                            steps.map((step, index) => {
                                const Icon = step.icon

                                return (
                                    <div
                                        className='bg-white dark:bg-[#070c1a] rounded-lg p-6 shadow-sm'
                                        key={index}
                                    >
                                        <div className='flex items-center justify-between mb-5'>
                                            <div className='h-11 w-11 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 flex items-center justify-center'>
                                                <Icon size={23} />
                                            </div>

                                            <span className='text-3xl font-bold text-slate-200 dark:text-white/10'>
                                                0{index + 1}
                                            </span>
                                        </div>

                                        <h3 className='text-lg font-semibold text-cyan-950 dark:text-white mb-3'>
                                            {step.title}
                                        </h3>

                                        <p className='text-gray-600 dark:text-gray-300 leading-6'>
                                            {step.description}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BookingSteps;
