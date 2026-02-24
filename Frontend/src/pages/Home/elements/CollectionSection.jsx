import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import Card from '../../../components/Card'
import Button from '../../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getRequest } from '../../../apiRequest/axios'
import { setProducts } from '../../../store/productSlice'

const CollectionSection = () => {

    const dispatch = useDispatch();
    const products = useSelector((state)=>state.product?.products);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const navigateToProductDetail = (id)=>{
      navigate(`/products/${id}`);
    }
    
    const bestSeller = [...products].sort((a, b)=>b.ratings?.average - a.ratings?.average).slice(0, 15);


    const getBestProduct = async ()=>{
        try {
            setIsLoading(true)
            const data = await getRequest("/products");
            dispatch(setProducts(data?.products))
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getBestProduct();
    },[]);

    return (
        <>
            <div className='container mx-auto p-3'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>Shop <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>Collection</span></h1>
                <div className='flex flex-col lg:flex-row justify-start items-center lg:h-[600px] lg:gap-10 gap-5 mt-5'>
                    <div className='h-full w-[100%] lg:w-[50%] bg-gray-200 flex justify-center items-center relative'>
                        <img src="/assets/images/head-band.png" className='object-contain' alt="" />
                        <div className='flex flex-col justify-center items-start absolute left-5 bottom-5'>
                            <h1 className='text-4xl font-[600]'>Headband</h1>
                            <NavLink to="/shop/headbonds" className="flex justify-center items-center gap-2"><span>Collection</span><FaArrowRight /></NavLink>
                        </div>
                    </div>
                    <div className='h-full w-full lg:w-[40%] flex flex-col justify-between items-start gap-5'>
                        <div className='h-[48%] w-full bg-gray-200 relative flex justify-end items-center'>
                            <img src="/assets/images/earbuds.png" alt="" />
                            <div className='flex flex-col justify-center items-start absolute left-5 bottom-5'>
                                <h1 className='text-4xl font-[600]'>Earbuds</h1>
                                <NavLink to="/shop/earbuds" className="flex justify-center items-center gap-2"><span>Collection</span><FaArrowRight /></NavLink>
                            </div>
                        </div>

                        <div className='h-[48%] w-full bg-gray-200 relative flex justify-end items-end'>
                            <img src="/assets/images/accessories.png" className='h-[95%]' alt="" />
                            <div className='flex flex-col justify-center items-start absolute left-5 bottom-5'>
                                <h1 className='text-4xl font-[600]'>Accessories</h1>
                                <NavLink to="/shop/accessories" className="flex justify-center items-center gap-2"><span>Collection</span><FaArrowRight /></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-3">
                <h1 className='text-3xl sm:text-3xl mt-5 md:text-4xl lg:text-5xl font-bold'>Best <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>Seller</span></h1>
                <div className='w-full flex justify-center lg:justify-between relative items-center flex-wrap gap-y-5 mt-[50px]'>
                    {isLoading ? <div className='loader'></div> : null}
                    {bestSeller.slice(0, 4).map((bs) => {
                        return (
                            <div key={bs._id} className='w-full sm:w-[48%] md:w-[32%] lg:w-[23%]'>
                                <Card navigateToProductDetail={navigateToProductDetail} data={bs} />
                            </div>
                        )
                    })}
                </div>

            </div>

            <div className="container mx-auto mt-[100px] p-3">
                <div className='flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0'>
                    <div className='h-[400px] w-full lg:w-[49%] rounded-2xl overflow-hidden'>
                        <img src="/assets/images/bannerImg.png" className='h-[100%] w-[100%] object-cover' alt="" />
                    </div>
                    <div className='h-[400px] w-full lg:w-[49%] bg-[#ffaa0086] rounded-2xl flex flex-col justify-center gap-3 p-6'>
                        <h4 className='text-xl text-blue-400 font-bold'>PROMOTION</h4>
                        <h1 className='text-5xl font-[600]'>Hurry up! 40% OFF</h1>
                        <p className='text-xl'>Thousands of high tech are waiting for you</p>
                        <Button text="Shop Now" className="py-2 w-[50%] lg:w-[30%] bg-black text-white rounded" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CollectionSection