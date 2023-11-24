import Lottie from "lottie-react";
import forum from './LottieFiles/forum.json'

const Banner = () => {
    return (
        <div className="hero bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  max-w-[2200px] h-[100vh]">
            <div className="hero-content flex-col lg:flex-row">
                <Lottie animationData={forum} loop={true}></Lottie>
                <div className="lg:w-[600px]">
                    <h1 className="text-3xl font-bold">Welcome to our forum <br /><span className="text-white">InsightBloom</span></h1>
                    <p className="py-6">Search here your fevorite post tag!</p>
                    <div className="join">
                        <div>
                            <div>
                                <input className="input input-bordered join-item" placeholder="Search" />
                            </div>
                        </div>
                        <button className="btn join-item bg-indigo-500">Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;