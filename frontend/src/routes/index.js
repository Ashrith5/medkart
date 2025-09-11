import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../Components/Home';
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import SellerSignup from "../Pages/sellers/SellerSignUp";
import SellerLogin from "../Pages/sellers/SellerLogin";


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
            },
            {
                path:"seller-signup",
                element:<SellerSignup/>
            },
            {
                path:"seller-signin",
                element:<SellerLogin/>
            }
        ]
    },

])
export default router