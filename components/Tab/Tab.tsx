import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Tab = () => {
    return (
        <section className='container pl-8 pt-4 mb-5 pr-7'>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
                <Link href="/buy">
                    <div className="bg-[#24252d] p-1 lg:p-2 rounded space-y-2  cursor-pointer relative">
                        <div className="relative w-full h-52 rounded overflow-hidden">
                            <Image
                                alt="blog-img"
                                src="/images/HACk1.jpg"
                                fill
                                className="object-cover"
                            />
                            <div
                                className="absolute inset-0 flex items-center justify-center
                                            
                            ">
                                <button className="bg-yellow-400 px-10 py-1 rounded-full
                                 text-black font-semibold">
                                    Mint now
                                </button>
                            </div>
                        </div>
                        <div>
                            <span className="text-lg text-white">Hippie Alien Space Hovership</span>
                        </div>
                        <span className="text-sm text-[#8454d8]">Zuraverse</span>
                    </div>
                </Link>
                <Link href="/buyzurahome">
                    <div className="bg-[#24252d] p-1 lg:p-2 rounded space-y-2  cursor-pointer relative group">
                        <div className="relative w-full h-52 rounded overflow-hidden">
                            <Image
                                alt="blog-img"
                                src="/images/Zura_banner.jpg"
                                fill
                                className="object-cover"
                            />
                            <div
                                className="absolute inset-0 flex items-center justify-center
                                            opacity-0 group-hover:opacity-100 transition-opacity
                                            ease-in-out duration-500
                            ">
                                <button className="bg-yellow-400 px-10 py-1 rounded-full
                                 text-black font-semibold">
                                    Mint now
                                </button>
                            </div>
                        </div>
                        <div>
                            <span className="text-lg text-white">Zuraverse House</span>
                        </div>
                        <span className="text-sm text-[#8454d8]">Zuraverse</span>
                    </div>
                </Link>
                <div className="bg-[#24252d] p-1 lg:p-2 rounded space-y-2 cursor-pointer relative group">
                    <div className="relative w-full h-52 rounded overflow-hidden">
                        <Image
                            alt="blog-img"
                            src="/images/hash_2.jpg"
                            fill
                            className="object-cover"
                        />
                        <div
                            className="absolute inset-0 flex items-center justify-center
                                            opacity-0 group-hover:opacity-100 transition-opacity
                                            ease-in-out duration-500
                            ">
                            <button className="bg-yellow-400 px-10 py-1 rounded-full
                                 text-black font-semibold">
                                Coming Soon
                            </button>
                        </div>
                    </div>
                    <div>
                        <span className="text-lg text-white">Hippie Alien Cosmic Klub</span>
                    </div>
                    <span className='text-sm text-[#8454d8] '>Zuraverse</span>
                </div>
                <div className="bg-[#24252d] p-1 lg:p-2 rounded space-y-2 cursor-pointer relative group">
                    <div className="relative w-full h-52 rounded overflow-hidden">
                        <Image
                            alt="blog-img"
                            src="/images/Conzura.jpg"
                            fill
                            className="object-cover"
                        />
                        <div
                            className="absolute inset-0 flex items-center justify-center
                                            opacity-0 group-hover:opacity-100 transition-opacity
                                            ease-in-out duration-500
                            ">
                            <button className="bg-yellow-400 px-10 py-1 rounded-full
                                 text-black font-semibold">
                                Coming Soon
                            </button>
                        </div>
                    </div>
                    <div>
                        <span className="text-lg text-white">Conzura Wildlife</span>
                    </div>
                    <span className='text-sm text-[#8454d8] '>Conzura</span>
                </div>
                <div className="bg-[#24252d] p-1 lg:p-2 rounded space-y-2 cursor-pointer relative group">
                    <div className="relative w-full h-52 rounded overflow-hidden">
                        <Image
                            alt="blog-img"
                            src="/images/HACk2.png"
                            fill
                            className="object-cover"
                        />
                        <div
                            className="absolute inset-0 flex items-center justify-center
                                            opacity-0 group-hover:opacity-100 transition-opacity
                                            ease-in-out duration-500
                            ">
                            <button className="bg-yellow-400 px-10 py-1 rounded-full
                                 text-black font-semibold">
                                Coming Soon
                            </button>
                        </div>
                    </div>
                    <div>
                        <span className="text-lg text-white">ZURIAN</span>
                    </div>
                    <span className='text-sm text-[#8454d8] '>Zuraverse</span>
                </div>
                <div className="bg-[#24252d] p-1 lg:p-2 rounded space-y-2 cursor-pointer relative group">
                    <div className="relative w-full h-52 rounded overflow-hidden">
                        <Image
                            alt="blog-img"
                            src="/images/HACk3.png"
                            fill
                            className="object-cover"
                        />
                        <div
                            className="absolute inset-0 flex items-center justify-center
                                            opacity-0 group-hover:opacity-100 transition-opacity
                                            ease-in-out duration-500
                            ">
                            <button className="bg-yellow-400 px-10 py-1 rounded-full
                                 text-black font-semibold">
                                Coming Soon
                            </button>
                        </div>
                    </div>
                    <div>
                        <span className="text-lg text-white">ZURAPARK LAND</span>
                    </div>
                    <span className='text-sm text-[#8454d8] '>Zuraverse</span>
                </div>
            </div>
        </section>
    )
}

export default Tab