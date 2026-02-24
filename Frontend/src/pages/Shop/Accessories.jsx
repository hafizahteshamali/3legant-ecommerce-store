import React, { useEffect, useState } from 'react'
import { AccessoriesData } from '../../assets/ConstantData'
import Card from '../../components/Card'
import { getRequest } from '../../apiRequest/axios';

const Accessories = () => {

    const [isAccessoriesProducts, setIsAccessoriesProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getAccessoriesProducts = async ()=>{
        try {
            setIsLoading(true)
            const data = await getRequest("/products/filter-product?category=accessories")
            setIsAccessoriesProducts(data?.products);
        } catch (error) {
            setIsLoading(false)
            console.log(error.message);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        getAccessoriesProducts();
    }, []);

  return (
    <div className='container mx-auto p-3'>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 my-5">
                Accessories <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Products</span>
            </h2>

            <div className='flex justify-between items-center flex-wrap my-5 gap-3.5'>
                {isAccessoriesProducts.map((ac, index) => {
                    return (
                        <div key={ac._id} className='w-full sm:w-[48%] md:w-[32%] lg:w-[23%]'>
                            <Card data={ac} />
                        </div>
                    )
                })}
            </div>
        </div>
  )
}

export default Accessories