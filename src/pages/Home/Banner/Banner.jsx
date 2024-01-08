import { axiosPublic } from "../../../hooks/useAxiosPublic";
import banner from '../../../assets/banner-3.jpg'

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
        <>
            <div className="hero bg-[#161A30]  max-w-[2350px] lg:h-[100vh] md:h-[100vh] h-[400px] z-0 relative" style={{
                backgroundImage: `url(${banner})`,
                objectFit: "fit",
                opacity: "50%",
                width: "100 %",
                placeItems: "center",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }} >

            </div >
            <div className="hero-content flex-col lg:flex-row absolute top-[5%] lg:bottom-0 md:bottom-0 bottom-[50%] w-auto left-[5%]  right-[5%] md:left-[5%]  md:right-[5%]  2xl:left-[25%]  2xl:right-[25%] ">
                <div className="text-[#FFFFFF] p-8" data-aos="fade-left">
                    <p className="py-3 text-black">Search here your fevorite post tag!</p>
                    <form onSubmit={handleSearchLocal}>
                        <div className="join">
                            <div>
                                <div>
                                    <input className="input input-bordered join-item w-[60vw] md:w-80 lg:w-96 text-black" placeholder="Search" name="search" />
                                </div>
                            </div>
                            <input type="submit" value="Search" className="btn join-item bg-indigo-500  " />
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};

export default Banner;