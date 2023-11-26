import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosPublic } from '../../../../hooks/useAxiosPublic';
import { FaComments } from 'react-icons/fa';
import { IoArrowDown, IoArrowUp, IoShareSocialOutline } from 'react-icons/io5';
import '../style.css'
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../sharedComponents/Loading/Loading';
import SharePost from './SharePost';


const PostDetails = () => {
    const { id } = useParams();
    const [clicked, setClicked] = useState(false)

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
        setClicked(!clicked)
        if (clicked == true && totalUpVotes > 0) {
            setTotalUpVotes(totalUpVotes - 1)
        }
        else if (totalUpVotes == 0 && totalDownVotes==0) {
            setTotalUpVotes(totalUpVotes + 1)
        }
        else if (totalUpVotes == 0 && totalDownVotes == 1) {
            setTotalUpVotes(totalUpVotes + 1)
            setTotalDownVotes(totalDownVotes - 1)
        }
        refetch()
    }

    const handleClickedDown = () => {
        setClicked(!clicked)
        if (clicked == true && totalDownVotes > 0) {
            setTotalDownVotes(totalDownVotes - 1)
        }
        else if (totalDownVotes == 0 && totalUpVotes==0) {
            setTotalDownVotes(totalDownVotes + 1)
            axiosPublic.post(`/api/post/${id}`, post.totalDownVotes);
        }
        else if (totalDownVotes == 0 && totalUpVotes == 1) {
            setTotalDownVotes(totalDownVotes + 1)
            setTotalUpVotes(totalUpVotes - 1)
        }
        refetch()
    }




    return (
        <div>
            <div className='bg-white rounded-xl min-h-content p-8 my-20 border-2 border-indigo-300'>
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
                        <button className={'btn btn-sm'} onClick={handleClickedUp}><IoArrowUp className=' text-lg'></IoArrowUp> <span >{totalUpVotes + post?.upVote}</span></button>
                        <button className={'btn btn-sm'} onClick={handleClickedDown}><IoArrowDown className=' text-lg'></IoArrowDown>{totalDownVotes + post?.downVote}</button>
                        <button className='btn btn-sm'><SharePost className=' text-lg'></SharePost > {post?.postShare}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;