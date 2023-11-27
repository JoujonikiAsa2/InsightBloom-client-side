import { Helmet } from "react-helmet";
import Banner from "./Banner/Banner";
import Tag from "./Tag/Tag";
import Announcements from "./Announcements/Announcements";
import Posts from "./Posts/Posts";
import { useLoaderData } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>InsightBloom | Home</title>
            </Helmet>
            <div className=" -z-0">
                <Banner></Banner>
                <Tag></Tag>
                <Announcements></Announcements>
                <Posts></Posts>
            </div>
        </>
    );
};

export default Home;