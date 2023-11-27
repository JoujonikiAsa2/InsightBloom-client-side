import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { axiosPublic } from '../../../../hooks/useAxiosPublic';
import { FaComments } from 'react-icons/fa';
import { BiDownvote, BiSolidDownvote, BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";

import '../style.css'
import { useQuery } from '@tanstack/react-query';
import SharePost from './SharePost';
import useAuth from '../../../../hooks/useAuth';
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2';
import { IoHeart, IoHeartDislike } from 'react-icons/io5';


const PostDetails = () => {
    const { id } = useParams();
    const [clicked, setClicked] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const { user } = useAuth()
    console.log(location)

    // fatching post data by id
    const { isLoading, error, refetch, data: post = [] } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/post/${id}`);
            return res.data;
        },
    })

    // fetching all comments 
    const { refetch: refaching, data: comments = [] } = useQuery({
        queryKey: ['comment'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/comments');
            return res.data;
        },
    })

    // fetching comment by email
    const { refetch: reFetch, data: comment=[] } = useQuery({
        queryKey: ['/comments/count'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/comments/count`)
            return res.data
        }
    })

    // fetching comment by email
    const { refetch: refetchComment, data: commentPerPost=[] } = useQuery({
        queryKey: ['commentPerPost', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/comments/post/${id}`)
            return res.data
        }
    })


    const [totalUpVotes, setTotalUpVotes] = useState(0)
    const [totalDownVotes, setTotalDownVotes] = useState(0)

    const handleClickedUp = () => {
        if (user) {
            setClicked(!clicked)
            if (clicked == true && totalUpVotes > 0) {
                return setTotalUpVotes(totalUpVotes - 1)
            }
            else if (totalUpVotes == 0 && totalDownVotes == 0) {
                return setTotalUpVotes(totalUpVotes + 1)
            }
            else if (totalUpVotes == 0 && totalDownVotes == 1) {
                setTotalDownVotes(totalDownVotes - 1)
                return setTotalUpVotes(totalUpVotes + 1)
            }
            refetch()
        }
        else {
            navigate('/signIn', { state: location.pathname })
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
            navigate('/signIn', { state: location.pathname })
        }
    }



    // make comment section using react hook component

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        console.log(commentPerPost)

        // create an object to send to the database

        const comments = {
            post_id: id,
            image: user?.photoURL,
            name: user?.displayName,
            email: user?.email,
            comment: data?.comment,
            like: 0,
            dislike: 0
        }
        console.log(comments)

        if (user) {

            // console.log("Total",{comment})

            // send the comment data to the database
            axiosPublic.post('/api/comments', comments)
                .then(res => {
                    console.log("My comment", res.data)
                    refetchComment()
                })
                .catch(error => console.log(error.message))
        }

        // handle the comment button for unauthorized user
        else if (user == null) {
            Swal.fire({
                title: "Please Login",
                text: 'You have to login for comment on any post',
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
            navigate('/signIn', { state: location.pathname })
        }
        else {
            console.log("Total",comment.comment)
            Swal.fire({
                title: "Tou are not able to comment",
                text: 'You have exceeded the comment limit',
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
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
                        <button className='btn btn-sm text-xs bg-purple-300 capitalize'>{post?.tag}</button>
                    </div>
                    <p>{post?.postDescription}</p>
                    <div className='flex gap-4'>
                        <button className='btn btn-sm '><FaComments className=' text-lg'></FaComments>{commentPerPost.length}</button>
                        <button className={'btn btn-sm'} onClick={handleClickedUp}>{clicked && totalUpVotes == 1 && totalDownVotes == 0 ? <BiSolidUpvote className=' text-lg'></BiSolidUpvote> : <BiUpvote className=' text-lg'></BiUpvote>} <span >{totalUpVotes + post?.upVote}</span></button>
                        <button className={'btn btn-sm'} onClick={handleClickedDown}>{clicked && totalUpVotes == 0 && totalDownVotes == 1 ? <BiSolidDownvote className=' text-lg'></BiSolidDownvote> : <BiDownvote className=' text-lg'></BiDownvote>}{totalDownVotes + post?.downVote}</button>
                        <div onClick={() => !user && navigate('/signIn', { state: location.pathname })}><SharePost postId={post._id} className=' text-lg'></SharePost > {post?.postShare}</div>
                    </div>
                </div>
            </div>
            <div className='flex lg:flex-row md:flex-row flex-col gap-2'>
                {/* form */}
                <div className='lg:w-1/3 md:w-1/3 w-full'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="flex gap-2 justify-center items-center">
                                    <textarea
                                        placeholder="Enter your comment here....."
                                        name="comment"
                                        {...register("comment", { required: true })} aria-setsize={10} className="input input-bordered w-full h-80 p-2"
                                    />
                                </div>
                                <div className="ml-5 text-white pt-2">
                                    {errors.comment && <span className="text-red-400">This field is required</span>}
                                </div>
                            </div>
                        </div>
                        <input type="submit" value="Comment" className="btn mt-3 mb-8 btn-primary  input-bordered w-1/7 text-white" />
                    </form>
                </div>

                <div className='divider'></div>

                {/* All comment */}
                <div className='bg-white rounded-xl min-h-content p-8 mb-20 border-2 border-indigo-300 lg:w-2/3 md:w-2/3 w-full'>
                    <h2 className='text-xl font-bold py-4'>Comments</h2>
                    <table className='table overflow-scroll'>
                        <thead className='border-2 border-gray-200'>
                            <tr className='flex justify-between items-center text-black font-bold text-lg'>
                                <th className='w-1/3 text-center'>Comment</th>
                                <th className='w-1/3 text-center'>Like </th>
                                <th className='w-1/3 text-center'>Dislike</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                commentPerPost.map(comment =>
                                    <tr className='flex justify-between items-center border-2 border-l-gray-300'>
                                        <td className='w-1/3'>
                                            <div className='flex gap-2 items-center'>
                                                <div>
                                                    <img src={comment.image} alt="" className='lg:w-12 lg:h-12 w-12 h-12 rounded-full' />
                                                </div>
                                                <h4 className='capitalize lg:text-md font-bold'>{comment.name}</h4>
                                            </div>
                                            <div className='py-3'>
                                                {comment.comment}
                                            </div>
                                        </td>
                                        <td className='flex gap-2 justify-center items-center w-1/3 text-xl'>
                                            <IoHeart className='text-xl'></IoHeart>{comment.like}
                                        </td>
                                        <td className='flex gap-2  justify-center items-center w-1/3 text-xl'>
                                            <IoHeartDislike className='text-xl'></IoHeartDislike>{comment.dislike}
                                        </td>

                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


export default PostDetails;