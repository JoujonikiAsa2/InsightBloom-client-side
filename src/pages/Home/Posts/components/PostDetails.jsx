import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { axiosPublic } from '../../../../hooks/useAxiosPublic';
import { FaComments } from 'react-icons/fa';
import { BiDownvote, BiSolidDownvote, BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";

import '../style.css'
import { useQuery } from '@tanstack/react-query';
import SharePost from './SharePost';
import useAuth from '../../../../hooks/useAuth';


const PostDetails = () => {
    const { id } = useParams();
    const [clicked, setClicked] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const { user } = useAuth()
    console.log(location)

    const { isLoading, error, refetch, data: post = [] } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/post/${id}`);
            return res.data;
        },
    })

    const [totalUpVotes, setTotalUpVotes] = useState(0)
    const [totalDownVotes, setTotalDownVotes] = useState(0)

    const handleClickedUp = () => {
        if (user) {
            setClicked(!clicked)
            if (clicked == true && totalUpVotes > 0) {
                setTotalUpVotes(totalUpVotes - 1)
            }
            else if (totalUpVotes == 0 && totalDownVotes == 0) {
                setTotalUpVotes(totalUpVotes + 1)
            }
            else if (totalUpVotes == 0 && totalDownVotes == 1) {
                setTotalDownVotes(totalDownVotes - 1)
                setTotalUpVotes(totalUpVotes + 1)
            }
            refetch()
        }
        else {
            navigate('/signIn', {state: location.pathname})
        }
    }

    const handleClickedDown = () => {
        if (user) {
            setClicked(!clicked)
            if (clicked == true && totalDownVotes > 0) {
                setTotalDownVotes(totalDownVotes - 1)
            }
            else if (totalDownVotes == 0 && totalUpVotes == 0) {
                setTotalDownVotes(totalDownVotes + 1)
            }
            else if (totalDownVotes == 0 && totalUpVotes == 1) {
                setTotalDownVotes(totalDownVotes + 1)
                setTotalUpVotes(totalUpVotes - 1)
            }
            refetch()
        }
        else {
            console.log("I am thik achi")
            navigate('/signIn', {state: location.pathname})
        }
    }




    return (
        <div>
            <div className='bg-white rounded-xl min-h-content p-8 mt-20 mb-4 border-2 border-indigo-300'>
                <div className="flex flex-col gap-4">
                    <div>
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="profile" className='w-12 h-12 rounded-full border-2 border-purple-500' />
                    </div>
                    <h5>{post?.authorName}</h5>
                    <p>{post?.time}</p>
                    <h2 className="text-xl font-bold">
                        {post?.postTitle}
                    </h2>
                    <div>
                        <button className='btn btn-sm text-xs bg-purple-300'>{post?.tag}</button>
                    </div>
                    <p>{post?.postDescription}</p>
                    <div className='flex gap-4'>
                        <button className='btn btn-sm '>Comment<FaComments className=' text-lg'></FaComments></button>
                        <button className={'btn btn-sm'} onClick={handleClickedUp}>{clicked && totalUpVotes==1 && totalDownVotes == 0 ? <BiSolidUpvote className=' text-lg'></BiSolidUpvote> : <BiUpvote className=' text-lg'></BiUpvote> } <span >{totalUpVotes + post?.upVote}</span></button>
                        <button className={'btn btn-sm'} onClick={handleClickedDown}>{clicked && totalUpVotes==0 && totalDownVotes == 1? <BiSolidDownvote className=' text-lg'></BiSolidDownvote> : <BiDownvote className=' text-lg'></BiDownvote>}{totalDownVotes + post?.downVote}</button>
                        <button className='btn btn-sm' onClick={()=>!user && navigate('/signIn', {state: location.pathname})}><SharePost className=' text-lg'></SharePost > {post?.postShare}</button>
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-xl min-h-content p-8 mb-20 border-2 border-indigo-300'>
                <h2 className='text-xl font-bold'>Comments</h2>
                <table className='table'>
                    <thead className='border-2 border-gray-200'>
                        <tr>
                            <th>comment</th>
                            <th>Reply</th>
                            <th>Like </th>
                            <th>Dislike</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
};

export default PostDetails;