import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { axiosPublic } from '../../../hooks/useAxiosPublic';
const AdminProfile = () => {

    const { user, loading } = useAuth()

    const { refetch: refetch, data: comments = [] } = useQuery({
        queryKey: 'totalComment',
        queryFn: async () => {
            const res = await axiosPublic.get('/commentCount')
            return res.data
        }
    })

    // console.log("From line 17 [adminProfile] ", comments)

    const { refetch: commentRefech, data: posts = [] } = useQuery({
        queryKey: 'totalPosts',
        queryFn: async () => {
            const res = await axiosPublic.get('/api/totalPost')
            return res.data
        }
    })

    // console.log("From line 27 [adminProfile] ", posts)

    const { refetch: userRefech, data: users = [] } = useQuery({
        queryKey: 'totalUsers',
        queryFn: async () => {
            const res = await axiosPublic.get('/userCount')
            return res.data
        }
    })

    // console.log("From line 37 [adminProfile] ", users)



    return (
        <div>
            <div className="avatar flex flex-col gap-3 justify-center items-center pt-12 ">
                <div className="w-16 lg:w-20 rounded-full relative bg-slate-500">
                    <img src={user?.photoURL} />
                </div>
                <h5 className='text-xs text-purple-800 righteous lg:text-2xl capitalize'>{user?.displayName}</h5>
                <p className='text-xs'>{user?.email}</p>
            </div>
            <div className='divider'></div>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 justify-center items-center justify-items-center lg:mx-36 mt-12 gap-4 m-4'>
                <div className='space-y-3 bg-indigo-400  text-xl lg:text-2xl font-bold w-80 lg:w-72 h-36 rounded-lg flex flex-col justify-center items-center'>
                    <h3 className='text-white'>Total Post</h3>
                    <h5 className='text-purple-800'>{posts.totalPost}</h5>
                </div>
                <div className='space-y-3 bg-purple-400 text-xl lg:text-2xl font-bold w-80 lg:w-72 h-36 rounded-lg flex flex-col justify-center items-center'>
                    <h3 className='text-white'>Total comment</h3>
                    <h5 className='text-[#3f5f20]'>
                        {
                            comments.totalComment
                        }</h5> 
                </div>
                <div className='space-y-3 bg-blue-400 text-xl lg:text-2xl font-bold w-80 lg:w-72 h-36 rounded-lg flex flex-col justify-center items-center'>
                    <h3 className='text-white'>Total users</h3>
                    <h5 className='text-[#3f5f20]'>
                        {
                            users.totalUser
                        }</h5> 
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;