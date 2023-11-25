import Lottie from "lottie-react";
import forum from './LottieFiles/forum.json'

const Banner = () => {
    const style = {
        height: "300px"
    }
    return (
        <div className="hero bg-[#364253]  max-w-[2200px] h-screen-[100vh]">
            <div className="hero-content flex-col lg:flex-row">
                <Lottie animationData={forum} loop={true} style={style}   data-aos="fade-right"></Lottie>
                <div className=" text-white"  data-aos="fade-left">
                    <h1 className="text-3xl font-bold">Welcome to our forum <br /><span>InsightBloom</span></h1>
                    <p className="py-3">Search here your fevorite post tag!</p>
                    <div className="join">
                        <div>
                            <div>
                                <input className="input input-bordered join-item w-48" placeholder="Search" />
                            </div>
                        </div>
                        <button className="btn join-item bg-indigo-500  text-white">Search</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;