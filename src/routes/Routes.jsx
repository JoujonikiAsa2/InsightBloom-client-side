import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Notifications from "../pages/Notifications/Notifications";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import PostDetails from "../pages/Home/Posts/components/postDetails";
import Payment from "../pages/Memberships/Payment";
import Memberships from "../pages/Memberships/Memberships";
import Dashboard from "../layouts/Dashboard";
import AddProfile from "../pages/Dashboard/AddProfile";
const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/membership',
                element: <Memberships></Memberships>
            },
            {
                path: '/notification',
                element: <Notifications></Notifications>
            },
            {
                path: '/postDetails/:id',
                element: <PostDetails></PostDetails>
            },
            {
                path: '/payment/:email',
                element: <Payment></Payment>
            },
        ]
    },
    {
        path: '/joinUs',
        element: <SignUp></SignUp>
    },
    {
        path: '/signIn',
        element: <Login></Login>
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [ {
            path: 'userProfile',
            element: <AddProfile></AddProfile>
        }]
    }
]);

export default Routes
