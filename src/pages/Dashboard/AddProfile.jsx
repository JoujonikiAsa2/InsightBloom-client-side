import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { axiosPublic } from '../../hooks/useAxiosPublic';
import gold from '../Dashboard/assets/medal1.png'
import bronze from '../Dashboard/assets/medal2.png'
import Post from '../Home/Posts/components/Post';
import useUserPost from '../../hooks/useUserPost';
import Lottie from 'lottie-react';
import nodata from './nodata.json'


const AddProfile = () => {

    const { user, loading } = useAuth()
    const userPost = useUserPost()
    

    // console.log(user)

    const [userDetails, setUserDetails] = useState([])

    useEffect(() => {
        axiosPublic.get(`/users/email/${user.email}`)
            .then(res => {
                setUserDetails(res.data)
            })
            .catch(error => console.log(error))
    }, [])


    console.log("User post", userPost)


    return (
        <div>
            <div className="avatar flex flex-col gap-3 justify-center items-center pt-12 ">
                <div className="w-16 lg:w-20 rounded-full relative bg-slate-500">
                    <img src={user?.photoURL} />
                </div>
                <div className='absolute top-10 left-[52%] rounded-full'>
                    {
                        userDetails.membership == 'Gold'
                            ?
                            <div className="w-8 lg:w-12 bg-gray-400 ">
                                <img src={gold} className='w-20 h-20 border-2 rounded-full border-gray-500' />
                            </div>
                            : <div className="avatar">
                                <div className="w-8 lg:w-12 bg-blue-400 ">
                                    <img src={bronze} className='w-full h-full border-2 rounded-full border-gray-500' />
                                </div>
                            </div>
                    }
                </div>
                <h5 className='text-xs text-purple-800 righteous lg:text-2xl capitalize'>{user?.displayName}</h5>
                <p className='text-xs'>{user?.email}</p>
            </div>
            <div className='divider'></div>
            <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 justify-center items-center justify-items-center lg:mx-36 mt-12 gap-4 m-4'>
                <div className='space-y-3 bg-indigo-400 text-3xl font-bold w-80 lg:w-96 h-36 rounded-lg flex flex-col justify-center items-center'>
                    <h3 className='text-white'>Your Post</h3>
                    <h5 className='text-purple-800'>{userPost.length}</h5>
                </div>
                <div className='space-y-3 bg-indigo-400 text-3xl font-bold w-80 lg:w-96 h-36 rounded-lg flex flex-col justify-center items-center'>
                    <h3 className='text-white'>Available Post</h3>
                    <h5 className='text-[#3f5f20]'>
                        {
                            5-userPost.length 
                        }</h5>
                </div>
            </div>
            <div className='my-12'>
                <div>
                    <h2 className='p-4 text-xl font-bold text-black'>Your Latest Post</h2>
                </div>
                {
                    userPost.length != 0 ? <div className='grid  grid-cols-1 lg:grid-cols-3 justify-center items-center justify-items-center gap-5'>
                        {
                            userPost.slice(0, 3).map(post => <Post post={post}></Post>)
                        }
                    </div> :
                        <div className='flex flex-col justify-center items-center py-20'>
                            <h1 className='text-base font-semibold'>You did not made any post yet</h1>
                            <Lottie animationData={nodata}></Lottie>
                        </div>
                }
            </div>
        </div>
    );
};

export default AddProfile;