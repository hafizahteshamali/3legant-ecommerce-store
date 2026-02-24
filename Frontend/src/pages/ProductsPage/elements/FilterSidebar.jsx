import React, { useEffect, useState } from 'react'

const FilterSidebar = ({ 
  isAllProducts,
  setIsAllProducts, 
  isPriceRange, 
  setIsPriceRange, 
  selectedCategories, 
  setSelectedCategories, 
  search, 
  setSearch, 
  setIsProductFound,
  getSearchResults,
  getFilteredByPrice,
  completeProduct, // Saare products yahan aayenge
  setCompleteProduct
}) => {
    // Categories ko state mein store karo - AB COMPLETE PRODUCT SE
    const [availableCategories, setAvailableCategories] = useState(["All"]);

    // Jab completeProduct change ho to categories update karo
    useEffect(() => {
        if (completeProduct && completeProduct.length > 0) {
            // Complete products se unique categories nikalna - ye kabhi nahi hatengi
            setAvailableCategories(["All", "headphones", "earbuds", "accessories"]);
        }
    }, [completeProduct]); // completeProduct pe depend karo, isAllProducts pe nahi

    const handleChangeSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        getSearchResults(value);
    }

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        // Radio button ke liye directly value set karo
        setSelectedCategories([value]);
    }

    const handlePriceChange = (type, value) => {
        let newMin = isPriceRange[0];
        let newMax = isPriceRange[1];
        
        if (type === 'min') {
            newMin = value;
            setIsPriceRange([newMin, newMax]);
        } else {
            newMax = value;
            setIsPriceRange([newMin, newMax]);
        }
        
        getFilteredByPrice(newMin, newMax);
    }

    const handleReset = () => {
        setSelectedCategories(["All"]);
        setIsPriceRange([0, 999999]);
        setSearch("");
    }



    return (
        <div>
            {/* Search area */}
            <input 
                onChange={handleChangeSearch} 
                type="text" 
                className='py-2 px-5 border border-gray-200 bg-white w-[100%] text-gray-700 outline-none rounded' 
                placeholder='Search...' 
                value={search}
            />

            {/* Category - Radio Buttons for Single Selection */}

            <div className='flex flex-col gap-2 mt-5'>
                <h3 className='text-2xl font-semibold'>Categories</h3>
                {availableCategories.map((cat, index) => {
                    // Check karo ki is category mein kitne products hain (UI feedback ke liye)
                    const productCount = completeProduct.filter(p => p.category === cat).length;
                    
                    return (
                        <div key={index} className='flex items-center gap-2'>
                            <input 
                                onChange={handleCategoryChange} 
                                value={cat} 
                                type="radio" 
                                name="category"
                                id={`category-${index}`}
                                checked={selectedCategories[0] === cat}
                                className='w-4 h-4 cursor-pointer'
                            />
                            <label 
                                htmlFor={`category-${index}`}
                                className='cursor-pointer flex items-center gap-1'
                            >
                                <span>{cat}</span>
                                {cat !== "All" && (
                                    <span className='text-xs text-gray-500'>({productCount})</span>
                                )}
                                {cat === "All" && selectedCategories[0] === "All" && (
                                    <span className='text-xs text-green-600 ml-1'>✓ Selected</span>
                                )}
                                {cat !== "All" && selectedCategories[0] === cat && (
                                    <span className='text-xs text-green-600 ml-1'>✓ Selected</span>
                                )}
                            </label>
                        </div>
                    )
                })}
                
                {/* Selected category dikhao */}
                {selectedCategories[0] !== "All" && (
                    <div className='mt-2 text-sm text-gray-600'>
                        Showing products from: <span className='font-semibold'>{selectedCategories[0]}</span>
                    </div>
                )}
            </div>

            <div className='mt-5'>
                {/* Reset Button */}
                <div className='mt-3 w-full flex justify-center items-center'>
                    <button 
                        onClick={handleReset}
                        className='bg-gray-400 rounded p-2 w-full hover:bg-gray-500 transition-colors text-white'
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

        </div>
    )
}

export default FilterSidebar