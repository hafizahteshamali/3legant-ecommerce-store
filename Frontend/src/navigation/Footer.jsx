import React from 'react'
import { MdOutlineMail } from 'react-icons/md'
import Button from '../components/Button'
import { NavLink } from 'react-router-dom'
import { NavigationData } from '../assets/ConstantData'

const Footer = () => {
  return (
    <>
      <div className='bg-gray-200 pt-5'>
        <div className="container mx-auto">
          <div className='flex flex-col lg:flex-row justify-between w-full items-center gap-5 lg:gap-0'>
            <div className='h-full'>
              <img src="/assets/images/headphone.png" className='h-[400px] w-[100%] object-cover' alt="" />
            </div>
            <div className='h-full flex flex-col justify-center items-start gap-4 p-3'>
              <h1 className='text-5xl font-semibold'>Join Our Newsletter</h1>
              <p className=''>Sign up for deals, new products and promotions</p>
              <div className='w-full flex justify-between items-center gap-3 border-b pb-1 border-gray-400'>
                <MdOutlineMail className='text-3xl' />
                <input placeholder='Email address' type="text" className='w-[80%] outline-none p-1' />
                <Button text="Signup" className="text-gray-400" />
              </div>
            </div>
            <div className='flex justify-center items-end h-full'>
              <img src="/assets/images/footer-img.png" className='h-[400px] w-[100%] object-cover' alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className='bg-[#141718]'>
        <div className="container mx-auto pt-5">
          <div className='h-[200px] w-full flex flex-col lg:flex-row justify-between items-center border-b border-gray-300'>
            <div className='w-full px-2.5 lg:w-[40%] flex justify-between items-center'>
              <NavLink className="block w-[200px] lg:border-r lg:border-gray-300" to="/"><img src="/assets/images/Logo-white.png" alt="" /></NavLink>
              <p className='text-gray-200'>Headphone Store</p>
            </div>
            <ul className='flex justify-center lg:justify-end items-center gap-5 lg:gap-8 w-full flex-wrap lg:w-[50%]'>
              {NavigationData.map((item, index) => {
                return (
                  <li key={index}>
                    <NavLink className="text-white" to={item.url}>{item.text}</NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='w-full flex justify-center lg:justify-start items-center py-5'>
            <p className='text-white text-sm'>Copyright © 2026 3legant. All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer