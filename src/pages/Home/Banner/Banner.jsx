import Lottie from "lottie-react";
import forum from './LottieFiles/forum.json'
import { axiosPublic } from "../../../hooks/useAxiosPublic";

const Banner = ({ handleSearch }) => {
    const style = {
        height: "300px"
    }

    const handleSearchLocal = (e) => {
        e.preventDefault()
        const form = e.target
        const sValue = form.search.value
        const search = {
            search_tag: sValue,
            time: new Date().toLocaleString()
        }
        axiosPublic.post('/api/search', search)
            .then(res => console.log("Successfull"))
            .catch(error => console.log(error))
        // console.log(sValue)
        handleSearch(sValue)
        form.reset()
    }
    return (
        <div className="hero bg-[#364253]  max-w-[2200px] h-screen-[100vh]">
            <div className="hero-content flex-col lg:flex-row">
                <Lottie animationData={forum} loop={true} style={style} data-aos="fade-right"></Lottie>
                <div className=" text-white" data-aos="fade-left">
                    <h1 className="text-3xl font-bold">Welcome to our forum <br /><span>InsightBloom</span></h1>
                    <p className="py-3">Search here your fevorite post tag!</p>
                    <form onSubmit={handleSearchLocal}>
                        <div className="join">
                            <div>
                                <div>
                                    <input className="input input-bordered join-item w-48" placeholder="Search" name="search" />
                                </div>
                            </div>
                            <input type="submit" value="Search" className="btn join-item bg-indigo-500  text-white" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Banner;