import { Helmet } from "react-helmet";
import Banner from "./Banner/Banner";
import Tag from "./Tag/Tag";
import Announcements from "./Announcements/Announcements";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>InsightBloom | Home</title>
            </Helmet>
            <div>
                <Banner></Banner>
                <Tag></Tag>
                <Announcements></Announcements>
            </div>
        </>
    );
};

export default Home;