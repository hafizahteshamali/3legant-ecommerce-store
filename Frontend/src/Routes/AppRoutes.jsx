import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Signup from '../pages/Authentication/Signup'
import VerifyOtp from '../pages/Authentication/VerifyOtp'
import Login from '../pages/Authentication/Login'
import ForgotPassword from '../pages/Authentication/ForgotPassword'
import ResetPassword from '../pages/Authentication/ResetPassword'
import Home from '../pages/Home/Home'
import Headbonds from '../pages/Shop/Headbonds'
import Earbuds from '../pages/Shop/Earbuds'
import Accessories from '../pages/Shop/Accessories'
import Product from '../pages/ProductsPage/Product'
import ProductDetail from '../pages/ProductsPage/ProductDetail'
import Cartpage from '../pages/CartPage/Cartpage'
import CheckoutPage from '../pages/Checkout/CheckoutPage'
import OrderConfirmation from '../pages/Checkout/OrderConfirmation'
import About from '../pages/servicesPage/About'
import Contact from '../pages/servicesPage/Contact'

const AppRoutes = () => {
  return (
    <Routes>
        <Route>
            <Route path='/signup' element={<Signup />} />
            <Route path='/verify-signup-otp' element={<VerifyOtp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/verify-otp-forgot-password' element={<VerifyOtp />} />
            <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/products' element={<Product />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cartpage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/order-confirmation/:id' element={<OrderConfirmation />} />
        </Route>
        <Route path='/shop' element={<Layout />}>
          <Route path='headbonds' element={<Headbonds />} />
          <Route path='earbuds' element={<Earbuds />} />
          <Route path='accessories' element={<Accessories />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes