import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';
import { axiosPublic } from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const usePost = () => {
    const { user } = useAuth()
    const [post, setPost] = useState([])

    const { refetch, data: userPost } = useQuery({
        queryKey: [user.email, 'userPost'],
        queryF: async () => {
            const res = await axiosPublic.get(`/post/${email}`)
                .then(res => {
                    setPost(res.data)
                })
                .catch(error => console.log(error))
        }
    })

    return [userPost, refetch];
};

export default usePost;