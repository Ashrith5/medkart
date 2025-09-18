import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from '../Components/Home';
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import AdminSignup from "../Pages/admin/AdminSignup";
import AdminLogin from  "../Pages/admin/AdminLogin";
import AdminDashboardLayout from "../Pages/admin/adminDashboard/adminDashboardLayout";
import SellerSignup from "../Pages/sellers/Sellercredentials/SellerSignUp";
import SellerLogin from "../Pages/sellers/Sellercredentials/SellerLogin";
import SellerDashboard from "../Pages/sellers/Sellerdashboard/SellerDashBoard";

// Admin Dashboard pages
import CategoryList from "../Pages/admin/adminDashboard/Categories/CategoryList";
import AddEditCategory from "../Pages/admin/adminDashboard/Categories/AddEditCategory";
import ReorderCategory from "../Pages/admin/adminDashboard/Categories/ReorderCategory";
import CustomerList from "../Pages/admin/adminDashboard/Customers/CustomerList";
import CustomerEdit from "../Pages/admin/adminDashboard/Customers/CustomerEdit";
import ManageListings from "../Pages/admin/adminDashboard/sellers/ManageListings";
import SellerContactEdit from "../Pages/admin/adminDashboard/sellers/SellerContactEdit";
import PendingSellerList from "../Pages/admin/adminDashboard/sellers/PendingSellerList";
import RejectedSellerList from "../Pages/admin/adminDashboard/sellers/RejectedSellerList";
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
                path:"admin-signup",
                element:<AdminSignup/>
            },
            {
                path:"admin-signin",
                element:<AdminLogin/>
            },
            // Admin Dashboard protected routes
            {
                path: "admindashboard",
                element: <AdminDashboardLayout />,
                children: [
                    // ✅ Categories
          { path: "categories", element: <CategoryList /> },
          { path: "categories/add", element: <AddEditCategory /> },
          { path: "categories/edit/:id", element: <AddEditCategory /> },
          { path: "categories/reorder", element: <ReorderCategory /> },

          // ✅ Customers
          { path: "customers", element: <CustomerList /> },
          { path: "customers/edit/:id", element: <CustomerEdit /> },



          // ✅ sellers
          { path: "sellers", element: <ManageListings /> },
          { path: "sellers/edit-contact/:id", element: <SellerContactEdit /> },

          // ✅ Sellers
          { path: "pending-sellers", element: <PendingSellerList /> },
          { path: "rejected-sellers", element: <RejectedSellerList /> },
                ],
            },
            // Seller Dashboard protected routes
            {
                path:"seller/dashboard",
                element:<SellerDashboard/>
            }
        ]
    },

])
export default router