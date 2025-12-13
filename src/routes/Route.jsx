import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Contest from "../pages/Contest";
import MainLayout from "../layout/MainLayout";
import Details from "../pages/Details";


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
      ]
    },

    {
        path:'*',
        element:<NotFound></NotFound>
    }

])