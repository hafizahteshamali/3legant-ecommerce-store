import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import { getRequest } from '../../apiRequest/axios'

const Headbonds = () => {

    const [isHeadphoneProducts, setIsHeadphoneProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getHeadphoneProducts = async ()=>{
        try {
            setIsLoading(true)
            const data = await getRequest("/products/filter-product?category=headphones")
            setIsHeadphoneProducts(data?.products);
        } catch (error) {
            setIsLoading(false)
            console.log(error.message);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getHeadphoneProducts();
    }, []);

    return (
        <div className='container mx-auto p-3'>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 my-5">
                Headphone <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Products</span>
            </h2>

            <div className='flex justify-between items-center flex-wrap my-5 gap-3.5 relative'>
            {isLoading && <div className='loader'></div>}
                {isHeadphoneProducts.map((hp) => {
                    return (
                        <div key={hp._id} className='w-full sm:w-[48%] md:w-[32%] lg:w-[23%]'>
                                <Card data={hp} />
                            </div>
                        
                    )
                })}
            </div>
        </div>
    )
}

export default Headbonds