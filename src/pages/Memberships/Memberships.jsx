import Lottie from "lottie-react";
import Payment from "./Payment";
import badge from './badge.json'
import { OKIcon } from "react-share";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Memberships = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const style = {
        height: "300px"
    }

    const handleSubscription =()=>{
        return navigate(`/payment/${user.email}`, {state:location.pathname})
    }
    return (
        <div>
            <div className="hero bg-[#364253]  max-w-[2200px] h-screen-[100vh]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <Lottie animationData={badge} loop={true} style={style} data-aos="fade-up"></Lottie>
                    <div className=" text-white" data-aos="fade-down">
                        <h1 className="text-3xl font-bold">Do you want to become <br /> a member?</h1>
                        <h5 className="py-3">Subscribe now!</h5>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center py-12">

                <div className="card w-96 h-72 border-2 border-slate-600 bg-white">
                    <h1 className="text-2xl font-bold text-yellow-400 p-3 text-center">Gold Badge</h1>
                    <div className="text-center py-6">
                        <p>
                            If you will becomes a member, you will receive the Gold badge and can do more than 5 posts.
                        </p>
                    </div>
                    <div className="text-center pb-6">
                        <h3 className="text-lg">You have to pay <span className="text-2xl font-bold text-black">$130</span></h3>
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="btn bg-green-500 text-white" onClick={handleSubscription}>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Memberships;