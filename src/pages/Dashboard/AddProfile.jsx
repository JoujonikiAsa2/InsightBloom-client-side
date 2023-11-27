import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { axiosPublic } from '../../hooks/useAxiosPublic';
import gold from '../Dashboard/assets/medal1.png'
import bronze from '../Dashboard/assets/medal2.png'


const AddProfile = () => {

    const { user, loading } = useAuth()
    console.log(user)
    const [userDetails, setUserDetails] = useState([])

    useEffect(() => {
        axiosPublic.get(`/users/email/${user.email}`)
            .then(res => {
                setUserDetails(res.data)
            })
            .catch(error => console.log(error))
    }, [])


    console.log(userDetails)


    return (
        <div className="avatar flex flex-col gap-3 justify-center items-center pt-12 ">
            <div className="w-16 lg:w-24 rounded-full relative">
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
            <h5 className='text-xs lg:text-xl capitalize'>{user?.displayName}</h5>
            <p className='text-xs'>{user?.email}</p>
        </div>
    );
};

export default AddProfile;