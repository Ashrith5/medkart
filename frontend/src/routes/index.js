import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../Components/Home';
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import SellerSignup from "../Pages/sellers/Sellercredentials/SellerSignUp";
import SellerLogin from "../Pages/sellers/Sellercredentials/SellerLogin";
import SellerDashboard from "../Pages/sellers/Sellerdashboard/SellerDashBoard";


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
            },
            {
                path:"seller/dashboard",
                element:<SellerDashboard/>
            }
        ]
    },

])
export default router