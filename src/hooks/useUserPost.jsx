import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic'


const useUserPost = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    const [userPost, setUserPost] = useState([])

    useEffect(() => {
        axiosPublic.get(`/post/${user.email}`)
            .then(res => {
                setUserPost(res.data)
            })
            .catch(error => console.log(error))
    }, [])

    return userPost;
};

export default useUserPost;