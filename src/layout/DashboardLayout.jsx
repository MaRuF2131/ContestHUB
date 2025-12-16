import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/common/Navbar'

function DashboardLayout() {
  return (
    <div>
        <Navbar></Navbar>
        <main className='min-h-[calc(100vh-140px)] pt-20'>
          <Outlet></Outlet>
        </main>
    </div>
  )
}

export default DashboardLayout