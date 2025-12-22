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
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageContests from "../pages/dashboard/admin/ManageContests";
import PrivateRoute from "./PrivateRoute";
import CreatorPrivateRoute from "./CreatorPrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
import MessageRoute from "./MessageRoute";


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
          element:
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
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
      element:
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>,
      children:[
        {
          index:true,
          element:<DashboardHome></DashboardHome>
        },
        {
          path:'/dashboard/add-contest',
          element:
          <CreatorPrivateRoute>
             <AddContest></AddContest>
          </CreatorPrivateRoute>
        },
        {
          path:'/dashboard/created-contests',
          element:
          <CreatorPrivateRoute>
             <CreatedContests></CreatedContests>
          </CreatorPrivateRoute>
        },
        {
          path:'/dashboard/submitted-tasks',
          element:
          <CreatorPrivateRoute>
            <SubmittedTasks></SubmittedTasks>
          </CreatorPrivateRoute>
        },
        {
          path:'/dashboard/edit-contest',
          element:
          <CreatorPrivateRoute>
            <EditContest></EditContest>
          </CreatorPrivateRoute>
        },
        {
          path:'/dashboard/manage-users',
          element:   
           <AdminPrivateRoute> 
             <ManageUsers></ManageUsers>
           </AdminPrivateRoute>
        },
        {
          path:'/dashboard/manage-contests',
          element:
          <AdminPrivateRoute>
            <ManageContests></ManageContests>
           </AdminPrivateRoute>
        }
      ]
    },
    {
      path: '/message',
      element: <MessageRoute />
    },

    {
        path:'*',
        element:<NotFound></NotFound>
    }

])