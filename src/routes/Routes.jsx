import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import MemberShips from "../pages/MemberShips/MemberShips";
import Notifications from "../pages/Notifications/Notifications";
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
            }
        ]
    },
]);

export default Routes
