import { Helmet } from "react-helmet";
import Banner from "./Banner/Banner";
import Tag from "./Tag/Tag";
import Posts from "./Posts/Posts";
import { useState } from "react";
const Home = () => {

    const [valueS, setValueS] = useState(null)

    const handleSearch = (value) => {
        setValueS(value)
    }
    console.log("Home", valueS)
    return (
        <>
            <Helmet>
                <title>InsightBloom | Home</title>
            </Helmet>
            <Banner handleSearch={handleSearch}></Banner>
            <div className="flex md:flex-row flex-col lg:flex-row gap-4 my-12 justify-center mx-[4vw]">
                <div className="lg:w-[20vw] md:w-48 w-full ">
                    <Tag handleSearch={handleSearch}></Tag>
                </div>
                <div  className="">
                    <Posts searchValue={valueS}></Posts>
                </div>
            </div>
        </>
    );
};

export default Home;