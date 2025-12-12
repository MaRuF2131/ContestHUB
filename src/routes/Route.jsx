import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";


 export const Route=createBrowserRouter([
    {
      path:'/',
      element:<Home></Home>
    },
    {
        path:'*',
        element:<NotFound></NotFound>
    }

])