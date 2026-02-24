import React, { useEffect, useState } from 'react'
import FilterSidebar from './elements/FilterSidebar'
import { getRequest } from '../../apiRequest/axios'
import Card from '../../components/Card';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [isAllProducts, setIsAllProducts] = useState([]);
  const [completeProduct, setCompleteProduct] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [search, setSearch] = useState("")
  const [isProductFound, setIsProductFound] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Saare products fetch karne ka function
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const res = await getRequest(`/products/filter-product?page=${page}`);
      if (res.success) {
        setTotalPages(res?.pages);
        setIsAllProducts(res?.products);
        setCompleteProduct(res?.products); // Complete products store karo
        setIsProductFound(res?.products.length > 0);
      }
    } catch (error) {
      console.log(error.message);
      setIsProductFound(false);
    } finally {
      setLoading(false);
    }
  }

  // Filter products by multiple categories (BACKEND API CALL) - Single category ke liye
  const getFilteredProducts = async (categories) => {
    setLoading(true);
    try {
      // Agar "All" select hai to saare products lao
      if (categories[0] === "All" || categories.length === 0) {
        getAllProducts();
        return;
      }

      // Single category ke liye
      const category = categories[0];
      console.log("Calling filter API with category:", category);
      const res = await getRequest(`/products/filter-product?category=${category}`);

      if (res.success) {
        setIsAllProducts(res?.products || []);
        setIsProductFound(res?.products?.length > 0);
      } else {
        setIsAllProducts([]);
        setIsProductFound(false);
      }
    } catch (error) {
      console.log(error.message);
      setIsAllProducts([]);
      setIsProductFound(false);
    } finally {
      setLoading(false);
    }
  }

  // Filter by search (BACKEND API CALL)
  const getSearchResults = async (searchTerm) => {
    setLoading(true);
    try {
      if (searchTerm.trim() === "") {
        // Agar search empty hai to current categories ke according filter karo
        getFilteredProducts(selectedCategories);
        return;
      }

      const res = await getRequest(`/products/search-product?search=${searchTerm}`);

      if (res?.success) {
        setIsAllProducts(res?.product || []);
        setIsProductFound(res?.product?.length > 0);
      } else {
        setIsAllProducts([]);
        setIsProductFound(false);
      }
    } catch (error) {
      console.log(error);
      setIsAllProducts([]);
      setIsProductFound(false);
    } finally {
      setLoading(false);
    }
  }

  const handleSelective = async (e) => {
    const value = e.target.value
    try {
      const res = await getRequest(`/products/filter-product?sort=${value}`)
      setIsAllProducts(res?.products);
      console.log("response value", res);
    } catch (error) {

    }
  }

  // Jab selectedCategories change ho to backend se filtered products lao
  useEffect(() => {
    getFilteredProducts(selectedCategories);
  }, [selectedCategories]);

  // Initial load par products fetch karo
  useEffect(() => {
    getAllProducts();
  }, [page])

  const navigate = useNavigate();

  const navigateToProductDetail = (id)=>{
    navigate(`/products/${id}`);
  }

  return (
    <div className='flex justify-between items-start bg-white my-5 py-5'>
      <div className='w-[20%] bg-gray-50 shadow p-5'>
        <FilterSidebar
          isAllProducts={isAllProducts}
          setIsAllProducts={setIsAllProducts}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          search={search}
          setSearch={setSearch}
          setIsProductFound={setIsProductFound}
          getSearchResults={getSearchResults}
          completeProduct={completeProduct} // Complete products pass karo
          setCompleteProduct={setCompleteProduct}
        />
      </div>
      <div className='w-[80%] bg-white flex justify-center items-start flex-wrap gap-5'>
        <div className='w-full flex justify-end items-center px-5'>
          <select
            className="border border-gray-200 outline-none text-gray-500 px-3 py-2 rounded"
            onChange={handleSelective}
          >
            <option value="">Default</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="price_asc">Price: Low to High</option>
          </select>
        </div>
        <div className='w-[100%] bg-white flex items-start flex-wrap gap-3'>
          {loading ? (
            <div className='w-full text-center py-10'>
              <p className='text-gray-500 text-lg'>Loading...</p>
            </div>
          ) : isProductFound ? (
            isAllProducts.map((product) => {
              return (
                <div key={product._id} className='sm:w-[48%] md:w-[48%] lg:w-[31%] xl:w-[24%] w-full'>
                  <Card navigateToProductDetail={navigateToProductDetail} data={product} />
                </div>
              )
            })
          ) : (
            <div className='w-full text-center py-10'>
              <p className='text-gray-500 text-lg'>No products found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="w-full flex justify-center items-center gap-2 py-12 flex-wrap">

            {/* Prev Button */}
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-2 rounded border text-sm font-medium transition
        ${page === 1
                  ? "opacity-40 cursor-not-allowed border-gray-300 text-gray-400"
                  : "border-gray-400 hover:bg-black hover:text-white"}
      `}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              const isActive = page === pageNumber;

              return (
                <button
                  key={index}
                  onClick={() => setPage(pageNumber)}
                  className={`h-[40px] w-[40px] rounded flex justify-center items-center text-sm font-medium transition-all duration-200 border
            ${isActive
                      ? "bg-black text-white border-black scale-105"
                      : "border-gray-300 hover:bg-gray-200"}
          `}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-4 py-2 rounded border text-sm font-medium transition
        ${page === totalPages
                  ? "opacity-40 cursor-not-allowed border-gray-300 text-gray-400"
                  : "border-gray-400 hover:bg-black hover:text-white"}
      `}
            >
              Next
            </button>

          </div>
        )}
      </div>
    </div>
  )
}

export default Product