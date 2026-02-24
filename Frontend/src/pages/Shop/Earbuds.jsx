import React, { useEffect, useState } from 'react'
import { EarbudsData } from '../../assets/ConstantData'
import Card from '../../components/Card'
import { getRequest } from '../../apiRequest/axios';

const Earbuds = () => {

    const [isEarbudsProducts, setIsEarbudsProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getEarbusProducts = async () => {
        try {
            setIsLoading(true)
            const data = await getRequest("/products/filter-product?category=earbuds")
            setIsEarbudsProducts(data?.products);
        } catch (error) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getEarbusProducts();
    }, []);

    return (
        <div className='container mx-auto p-3'>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 my-5">
                Earbuds <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Products</span>
            </h2>

            <div className='flex justify-between items-center flex-wrap my-5 gap-3.5 relative'>
                {isLoading && <div className='loader'></div>}
                {isEarbudsProducts.map((eb) => {
                    return (
                        <div key={eb._id} className='w-full sm:w-[48%] md:w-[32%] lg:w-[23%]'>
                            <Card data={eb} />
                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default Earbuds