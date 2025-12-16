import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Contest from "../pages/Contest";
import MainLayout from "../layout/MainLayout";
import Details from "../pages/Details";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../components/dashboard/common/DashboardHome";
import AddContest from "../pages/dashboard/creator/AddContest";
import CreatedContests from "../pages/dashboard/creator/CreatedContests";
import SubmittedTasks from "../pages/dashboard/creator/SubmittedTasks";
import EditContest from "../pages/dashboard/creator/EditContest";


 export const Route=createBrowserRouter([

    {
      path:'/',
      element:<MainLayout></MainLayout>,
      children:[
        {
          index:true,
          element:<Home></Home>
        },
        {
          path:'/all-contest',
          element:<Contest></Contest>
        },
        {
          path:'/contest/:id',
          element:<Details></Details>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>
        },
      ]
    },
    {
      path:'/dashboard',
      element:<DashboardLayout></DashboardLayout>,
      children:[
        {
          index:true,
          element:<DashboardHome></DashboardHome>
        },
        {
          path:'/dashboard/add-contest',
          element:<AddContest></AddContest>
        },
        {
          path:'/dashboard/created-contests',
          element:<CreatedContests></CreatedContests>
        },
        {
          path:'/dashboard/submitted-tasks',
          element:<SubmittedTasks></SubmittedTasks>
        },
        {
          path:'/dashboard/edit-contest',
          element:<EditContest></EditContest>
        }
      ]
    },

    {
        path:'*',
        element:<NotFound></NotFound>
    }

])