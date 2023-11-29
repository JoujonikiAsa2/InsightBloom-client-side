import { useEffect, useState } from "react";
import { axiosPublic } from "../../../hooks/useAxiosPublic";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './style.css';

import SectionTitle from "../../../sharedComponents/SectionTitle/SectionTitle";

const Tag = ({handleSearch}) => {

    const [tags, setTags] = useState([])

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

    const handleTagSearch = (tag) =>{
        handleSearch(tag)
    }
    return (
        <div>
            <SectionTitle heading="Tags" details="You can search post using those tag by clicking on tag."></SectionTitle>
            <Swiper
                {...swiperParams}
                modules={[Pagination]}
                className="mySwiper"
                data-aos="fade-right" data-aos-anchor-placement="center-center"
            >

                {
                    tags.map(tag =>
                        <SwiperSlide className="card shadow-lg shadow-slate-600 rounded lg:w-56 h-28 my-8 flex justify-center items-center hover:cursor-pointer" onClick={()=>handleTagSearch(tag)}>
                            <h2 className="text-xs lg:text-lg font-bold p-4 text-purple-700 capitalize">{tag}</h2>
                        </SwiperSlide>
                    )}
            </Swiper>
        </div>
    );
};

export default Tag;