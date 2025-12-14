import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Contest from "../pages/Contest";
import MainLayout from "../layout/MainLayout";
import Details from "../pages/Details";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";


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
        path:'*',
        element:<NotFound></NotFound>
    }

])