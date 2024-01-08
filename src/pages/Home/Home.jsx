import { Helmet } from "react-helmet";
import Banner from "./Banner/Banner";
import Tag from "./Tag/Tag";
import Announcements from "./Announcements/Announcements";
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
            <div className="mx-[4vw]">
                <Tag handleSearch={handleSearch}></Tag>
                <Announcements></Announcements>
                <Posts searchValue={valueS}></Posts>
            </div>
        </>
    );
};

export default Home;