import React from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';
import { FaComments } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Post = ({ post, index }) => {

    console.log(index)

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    }


    return (
        <Link to={`/postDetails/${post._id}`}>
            <div className='card transition-colors shadow-xl rounded-lg h-56 w-80 lg:w-[350px] p-4 space-y-4 pt-8 bg-[#d4dae4]' data-aos={index%2==0 ? "flip-left" : "flip-right"}>
                <div className="flex justify-start items-center gap-4">
                    <img src={post.authorImage} alt="profile" className='w-10 h-10 rounded-full border-2 border-purple-500' />
                    <h2 className="text-md font-bold">
                        {post.postTitle}
                    </h2>
                </div>
                <div className='space-y-3'>
                    <h4 className='capitalize text-indigo-600'>Tag: {post.tag}</h4>
                    <p> {formatDate(post.time)}</p>
                </div>
                <div className='flex justify-between items-center'>
                    <h5 className='flex gap-2 justify-center items-center text-lg'> <FaComments ></FaComments> {post.comments}</h5>
                    <h5 className='flex gap-2 justify-center items-center text-lg'><IoArrowUp></IoArrowUp> {post.upVote}</h5>
                    <h5 className='flex gap-2 justify-center items-center text-lg'><IoArrowDown></IoArrowDown> {post.downVote}</h5>
                </div>
            </div >
        </Link>
    );
};

export default Post;