import { Clock3, ShieldCheck, Wifi } from 'lucide-react';
import React from 'react';

const features = [
    {
        icon: Clock3,
        title: "Flexible booking",
        description: "Reserve a study room by date and time, then manage your booking from your account.",
    },
    {
        icon: Wifi,
        title: "Focused spaces",
        description: "Find rooms with helpful amenities like Wi-Fi, quiet zones, projectors, and power outlets.",
    },
    {
        icon: ShieldCheck,
        title: "Trusted listings",
        description: "Browse clear room details, pricing, and images before choosing the space that fits your work.",
    },
]

const StudyFeatures = () => {
    return (
        <div className='bg-white dark:bg-[#0b1120] py-16'>
            <section>
                <div className='mb-8'>
                    <h2 className='font-bold text-cyan-800 dark:text-cyan-400 tracking-wider uppercase'>
                        Why FocusHub
                    </h2>

                    <h1 className='text-3xl sm:text-4xl font-bold text-cyan-950 dark:text-white mt-2'>
                        Everything you need for better study sessions
                    </h1>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {
                        features.map((feature, index) => {
                            const Icon = feature.icon

                            return (
                                <div
                                    className='bg-slate-100 dark:bg-[#070c1a] rounded-lg p-6 shadow-sm'
                                    key={index}
                                >
                                    <div className='h-12 w-12 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 flex items-center justify-center mb-5'>
                                        <Icon size={24} />
                                    </div>

                                    <h3 className='text-xl font-semibold text-cyan-950 dark:text-white mb-3'>
                                        {feature.title}
                                    </h3>

                                    <p className='text-gray-600 dark:text-gray-300 leading-6'>
                                        {feature.description}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    );
};

export default StudyFeatures;
