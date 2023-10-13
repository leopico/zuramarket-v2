import Image from 'next/image'
import React from 'react'
import Tab from './Tab'

const TabSection = () => {
    return (
        <div className='container mx-auto'>
            <div className=' justify-between items-center hidden sm:flex'>
                <ul className='flex pl-8 space-x-7'>
                    <li className='underline cursor-pointer'>Zuraverse</li>
                    <li className='text-[#4e4e4e] cursor-not-allowed'>Conzura</li>
                    <li className='text-[#4e4e4e] cursor-not-allowed'>Lync.world</li>
                    <li className='text-[#4e4e4e] cursor-not-allowed'>Bhangola</li>
                </ul>
                <div className='pr-8 hidden sm:flex justify-center items-center cursor-pointer'>
                    <span className="me-3">See All</span>
                    <Image
                        alt='arrow'
                        width={30}
                        height={20}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABN0lEQVR4nO3YvS4FQRgG4PEThYRKoTiFRqFSqVwAN0Ap0bgFtc4taHUSF0DhJ05EIUqNRqNTkSAiPLLJd+J0Tk7sYdY81ezMJDtvsvvt7KRUFEVRFEXxv+EIV5hNOfPlEaupAUE6djCWcuPLGp6ifYmZlBMh2nO4jq57LKccg8T1BPai+wPbGEm5Benq38BrDB9jOuUYJMYWcBtT7rCYcgwS41M4iGlv2MRQvzc7V7Nv7j+MLbzH9H1M9hOkbmc9rmMpqlnlBvN9BUl/AFpdT8hLVRSyDFLBaJTlqjxXdjGecgvSgRU8xPJOU0OCnGQXRBMeLT/xsteoPajy2647yUA+iHUa6Bblt4I0YtMo9228JvxYacKvLtbxHO3qO9FKOdHA46DH3A/oDnGR/ZFpURRFURRF6sknrBMfBVNPZC8AAAAASUVORK5CYII="
                    />
                </div>
            </div>
            <Tab />
        </div>
    )
}

export default TabSection