import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Contest from "../pages/Contest";
import MainLayout from "../layout/MainLayout";


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
          path:'/contest',
          element:<Contest></Contest>
        },
      ]
    },

    {
        path:'*',
        element:<NotFound></NotFound>
    }

])