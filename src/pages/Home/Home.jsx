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
            <div className="flex gap-4 mb-12">
                <div className="w-48">
                    <Tag handleSearch={handleSearch}></Tag>
                </div>
                <div  className="flex-1">
                    <Posts searchValue={valueS}></Posts>
                </div>
            </div>
        </>
    );
};

export default Home;