import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div>
        <Navbar></Navbar>
        <main className='min-h-[calc(100vh-140px)] pt-20'>
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
    </div>
  )
}

export default MainLayout