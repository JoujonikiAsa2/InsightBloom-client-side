import { Outlet } from "react-router-dom";
import Footer from "../sharedComponents/Footer/Footer";
import Navbar from "../sharedComponents/Navbar/Navbar";

const Main = () => {
    return (
        <div className="max-w-[2200px] mx-auto inter">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;