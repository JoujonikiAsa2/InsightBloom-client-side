import { Outlet } from "react-router-dom";
import Footer from "../sharedComponents/Footer/Footer";
import Navbar from "../sharedComponents/Navbar/Navbar";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useEffect } from "react";

const Main = () => {
    // useEffect(() => {
    //     AOS.init({
    //         duration: 2000,
    //     });
    // }, [])
    return (
        <div className="max-w-[2350px] merriweather bg-[#ebf0ec]">
            <Navbar></Navbar>
            <div className="">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;