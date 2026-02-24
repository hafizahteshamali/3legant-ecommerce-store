import React from 'react'
import { advantages, InstagramData } from '../../../assets/ConstantData'

const NewsFeedSec = () => {
    return (
        <>
            <div className='container mx-auto my-[50px]'>
                <div className='flex justify-center lg:justify-between items-center flex-wrap gap-5 lg:gap-0'>
                    {advantages.map((item, index) => {
                        return (
                            <div key={index} className='h-[250px] w-[95%] sm:w-[48%] md:w-[32%] lg:w-[24%] bg-gray-200 rounded flex flex-col justify-center gap-3 p-5'>
                                <span>{item.icon}</span>
                                <h1 className='text-2xl font-semibold'>{item.text}</h1>
                                <p className='text-[16px] text-gray-500'>{item.subTitle}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="container mx-auto">
                <h4 className='text-gray-400 text-center mb-3'>NEWSFEED</h4>
                <h1 className='text-4xl font-[600] text-center mb-3'>Instagram</h1>
                <p className='text-center text-black mb-3'>Follow us on social media for more discount & promotions</p>
                <p className='text-center text-gray-400'>@3legant_official</p>

                <div className='my-5 flex flex-wrap gap-5 lg:gap-0 justify-center lg:justify-between items-center'>
                    {InstagramData.map((ins, index) => {
                        return (
                            <div className='w-[90%] sm:w-[48%] md:w-[32%] lg:w-[24%]' key={index}>
                                <img src={ins} className='h-[100%] w-[100%] object-cover' alt="" />
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default NewsFeedSec