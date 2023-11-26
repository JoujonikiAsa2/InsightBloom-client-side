import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import MemberShips from "../pages/MemberShips/MemberShips";
import Notifications from "../pages/Notifications/Notifications";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import PostDetails from "../pages/Home/Posts/components/postDetails";
import { axiosPublic } from "../hooks/useAxiosPublic";
const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: ()=> fetch('http://localhost:5000/api/totalPost')
            },
            {
                path: '/membership',
                element: <MemberShips></MemberShips>
            },
            {
                path: '/notification',
                element: <Notifications></Notifications>
            },
            {
                path: '/postDetails/:id',
                element: <PostDetails></PostDetails>
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
    }
]);

export default Routes
