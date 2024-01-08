import { useEffect, useState } from "react";
import { axiosPublic } from "../../../hooks/useAxiosPublic";

import './style.css';


const Tag = ({ handleSearch }) => {

    const [tags, setTags] = useState([])
    const [activeTag, setActiveTag] = useState(null);

    const swiperParams = {
        spaceBetween: 20,
        pagination: {
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
        },
    };

    useEffect(() => {
        axiosPublic.get('/api/tags')
            .then(res => {
                console.log(res.data)
                setTags(res.data)
            })
            .catch(error => console.log(error.message))
    }, [])

    const handleTagSearch = (tag) => {
        setActiveTag(tag);
        handleSearch(tag)
    }
    return (
        <div className="flex flex-col gap-2 justify-start bg-white rounded p-4">
            <div className="bg-gray-400 p-2 rounded">
                <h2 className="text-xs font-bold">All Tags</h2>
            </div>
            <div className="bg-gray-200 rounded p-2 flex flex-col gap-2 justify-start">
                {
                    tags.map(tag =>
                        <div className="mytag">
                            <a className={`mytag ${activeTag === tag ? 'active-tag' : 'capitalize text-xs'}`} onClick={() => handleTagSearch(tag)}>{tag}
                            </a>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Tag;