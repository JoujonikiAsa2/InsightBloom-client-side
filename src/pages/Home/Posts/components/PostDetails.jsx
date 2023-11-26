import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosPublic } from '../../../../hooks/useAxiosPublic';

const PostDetails = () => {
    const { id } = useParams()
    const [post,setPost] = useState()
    console.log(id)

    useEffect(()=>{
        axiosPublic.get(`/api/post/${id}`)
        .then(res=>setPost(res.data))
        .catch(error=>console.log(error))
    },[id])

    return (
        <div>
            <div className='border-2 border-blue-400 h-48'>
                <div>
                    <h2>
                        Title {post?.postTitle}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;