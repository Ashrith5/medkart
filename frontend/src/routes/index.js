import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../Components/Home';
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";


const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },{
                path:"Signup",
                element:<SignUp/>
            }
        ]
    },

])
export default router