import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import MemberShips from "../pages/MemberShips/MemberShips";
import Notifications from "../pages/Notifications/Notifications";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/membership',
                element: <MemberShips></MemberShips>
            },
            {
                path: '/notification',
                element: <Notifications></Notifications>
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
