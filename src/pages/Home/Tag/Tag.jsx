import { useEffect, useState } from "react";
import { axiosPublic } from "../../../hooks/useAxiosPublic";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { Pagination } from 'swiper/modules';

const Tag = () => {

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
        pagination: {
            clickable: true,
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
    return (
        <Swiper
            {...swiperParams}
            className="mySwiper"
        >

            {
                tags.map(tag =>
                    <SwiperSlide className="card shadow-lg shadow-slate-600 rounded lg:w-56 h-28 my-8 flex justify-center items-center">
                        <h2 className="text-xs lg:text-lg font-bold p-4 text-black capitalize">{tag}</h2>
                    </SwiperSlide>
                )}
        </Swiper>
    );
};

export default Tag;