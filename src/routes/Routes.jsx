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
import AddPost from "../pages/Dashboard/AddPost";
import MyPost from "../pages/Dashboard/MyPost";
import AllComment from "../pages/Dashboard/components/AllComment";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import ManageUser from "../pages/Dashboard/Admin/ManageUser";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement";
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
                element: <PrivateRoutes><Memberships></Memberships></PrivateRoutes>
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
        children: [
            // For user's dashboard
            {
                path: 'userProfile',
                element: <PrivateRoutes><AddProfile></AddProfile></PrivateRoutes>
            },
            {
                path: 'addPost',
                element: <AddPost></AddPost>
            },
            {
                path: 'myPost',
                element: <MyPost></MyPost>
            },
            {
                path: 'allcomment/:id',
                element: <AllComment></AllComment>
            },

            // For admin's dashboard
            {
                path: 'adminProfile',
                element: <PrivateRoutes><AdminProfile></AdminProfile></PrivateRoutes>
            },
            {
                path: 'manageUsers',
                element: <ManageUser></ManageUser>
            },
            {
                path: 'manageComments',
                element: <PrivateRoutes><AdminProfile></AdminProfile></PrivateRoutes>
            },
            {
                path: 'createAnnouncement',
                element: <MakeAnnouncement></MakeAnnouncement>
            }
        ]
    }
]);

export default Routes
