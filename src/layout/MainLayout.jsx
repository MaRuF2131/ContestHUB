import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { Outlet } from 'react-router-dom'
import ThemeToggle from '../utils/theme/Theme'

function MainLayout() {
  return (
    <div className='dark:bg-black bg-white'>
       {/* Theme Toggle */}
       <div className='fixed bottom-10 right-2 z-[999]'>
           <ThemeToggle />
        </div>
        <Navbar></Navbar>
        <main className='min-h-[calc(100vh-140px)] pt-18'>
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
    </div>
  )
}

export default MainLayout