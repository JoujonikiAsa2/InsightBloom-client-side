import React from 'react';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';
import { FaComments } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import '../style.css'

const Post = ({ post, index }) => {

    console.log(index)

    // fetching comment by email
    const { refetch: refetchComment, data: commentPerPost = [] } = useQuery({
        queryKey: ['commentPerPost', post._id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/comments/post/${post._id}`)
            return res.data
        }
    })
    console.log(commentPerPost)

    return (
        <Link to={`/postDetails/${post._id}`}>
            <div className='flex justify-between rounded-lg w-[80vw] md:w-[60vw] lg:w-[60vw] p-4 space-y-4 pt-8 divshadow ' data-aos={index % 2 == 0 ? "flip-left" : "flip-right"}>
                <div className='flex gap-6'>
                    <div className="flex justify-start items-center gap-4">
                        <img src={post.authorImage} alt="profile" className='w-8 md:w-10 lg:w-10 h-8 md:h-10 lg:h-10 rounded-full border-2 border-purple-500' />
                    </div>
                    <div className='space-y-3'>
                        <h2 className="text-md font-bold">
                            {post.postTitle}
                        </h2>
                        <h4 className='capitalize border-2 border-[#31304D] w-fit p-1 rounded text-xs hover:cursor-not-allowed'>{post.tag}</h4>
                        <p className='text-xs'>Published on: {post.time}</p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row lg:flex-row justify-between items-center gap-4'>
                    <div className=''>
                        <h5 className='flex gap-1 justify-center items-center text-xs text-gray-500'> <FaComments ></FaComments> ({commentPerPost.length})</h5>
                    </div>
                    <div className=''>
                        <h5 className='flex gap-1 justify-center items-center text-xs text-gray-500'><IoArrowUp></IoArrowUp> ({post.upVote})</h5>
                    </div>
                    <div className=''>
                        <h5 className='flex gap-1 justify-center items-center text-xs text-gray-500'><IoArrowDown></IoArrowDown> ({post.downVote})</h5>
                    </div>
                </div>
            </div >
        </Link>
    );
};

export default Post;