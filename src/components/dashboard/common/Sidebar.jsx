import React, { useState } from 'react'
import  useAuth  from '../hooks/UseAuth'
import {  NavLink } from'react-router-dom'
import { useNavigate } from 'react-router-dom';
import TextOrCardLoader from '../../loader/TextOrcardLoader'
import { LogOut,Home,
  User,
  ShoppingBag,
  PlusSquare,BarChart,TicketPercent,MessageCircleMore,ShieldAlert } from "lucide-react";


const userOptions=[
    {name:"Home" , path:'/',icon:Home},
    {name:"Over View" , path:"/dashboard",icon:BarChart},
    {name:"My Profile" , path:'/dashboard/My Profile',icon:User},
    {name:"My Products" , path:'/dashboard/My Products',icon:ShoppingBag},
    {name:"Add Products" , path:'/dashboard/Add Products',icon:PlusSquare},
]

const adminOptions=[
    {name:"Home" , path:'/',icon:Home},
    {name:"Statistics" , path:'/dashboard',icon:BarChart},
    {name:"Manage Users" , path:'/dashboard/Manage Users',icon:User},
    {name:"Manage Coupons" , path:'/dashboard/Manage Coupons',icon:TicketPercent},
]

const moderatorOptions=[
    {name:"Home" , path:'/',icon:Home},
    {name:"Over View" , path:"/dashboard",icon:BarChart},
    {name:"Product Review" , path:'/dashboard/Product Review',icon:MessageCircleMore},
    {name:"Reported Contents" , path:'/dashboard/Reported Contents',icon:ShieldAlert},
]
const Sidebar = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log(user)
    const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className='sidebar'>
         <div className="sidebar-profile">
              <img
                src={user?.photoURL || 'https://via.placeholder.com/40'}
                alt="User Profile"
                referrerPolicy='no-referrer'
                className="w-20 h-20 border-2 border-blue-700 rounded-full cursor-pointer"
              />
                <div className="mt-2 w-auto h-auto rounded-md shadow-lg py-1 dark:text-white text-black break-words max-w-[100%]">
                  <span className="break-words whitespace-normal">{user?.email}</span>
                </div>

          </div>
          {
              !user?.role && <TextOrCardLoader></TextOrCardLoader>

          }

        <ul className='link-list'>
            {
              user?.role==='user' && userOptions.map((options,index)=>(
                <li className=' relative w-fit inline-flex justify-center items-center' key={index}>
                      <options.icon className="w-5 h-5 text-black dark:text-white" />
                    <NavLink end className={({isActive})=>isActive?"active":"in-active"} to={options.path}>{options.name}</NavLink>
                </li>
              ))
              }
              {
              user?.role==='admin' && adminOptions.map((options,index)=>(
                <li className=' relative w-fit inline-flex justify-center items-center' key={index}>
                      <options.icon className="w-5 h-5 text-black dark:text-white" />
                    <NavLink end className={({isActive})=>isActive?"active":"in-active"} to={options.path}>{options.name}</NavLink>
                </li>
              )) 
              }
              {
              user?.role==='moderator' && moderatorOptions.map((options,index)=>(
                <li className=' relative w-fit inline-flex justify-center items-center' key={index}>
                      <options.icon className="w-5 h-5 text-black dark:text-white" />
                    <NavLink end className={({isActive})=>isActive?"active":"in-active"} to={options.path}>{options.name}</NavLink>
                </li>
              )) 
              }
        </ul>
        
        

          <button
              onClick={handleLogout}
              className=" w-full  text-start font-bold cursor-pointer border-t-2 border-gray-600 dark:border-gray-300 "
               >
                <span className='inline-flex justify-center items-center hover:text-shadow-md text-black dark:text-white text-shadow-amber-50'>
                  <LogOut className="w-5 h-5 text-black dark:text-white" />
                  Logout
                 </span>

            </button>

    </div>
  )
}

export default Sidebar
