import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../navigation/Header'
import Footer from '../navigation/Footer'

const Layout = () => {
  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout