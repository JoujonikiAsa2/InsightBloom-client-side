import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';
import { BiDownvote, BiSolidDownvote, BiSolidReport, BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";

// import '../../../../sryle.css'
import { useQuery } from '@tanstack/react-query';
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2';
import { IoHeart, IoHeartDislike } from 'react-icons/io5';
import useAuth from '../../../hooks/useAuth';
import { axiosPublic } from '../../../hooks/useAxiosPublic';
import SharePost from '../../Home/Posts/components/SharePost';
import { RiFeedbackFill } from 'react-icons/ri';


const AllComment = () => {
    const { id } = useParams();
    const [clicked, setClicked] = useState(false)
    const [disabled, setDisabled] = useState(true)

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
    const { refetch: reFetch, data: comment = [] } = useQuery({
        queryKey: ['/comments/count'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/comments/count`)
            return res.data
        }
    })

    // fetching comment by email
    const { refetch: refetchComment, data: commentPerPost = [] } = useQuery({
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
            console.log("Total", comment.comment)
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
        <div className='mt-4'>

            {/* All comment */}
            <div className='bg-white rounded-xl min-h-content p-8 mb-20 w-full'>
                <h2 className='text-xl font-bold py-4'>Comments</h2>
                <table className='table overflow-scroll'>
                    <thead className='border-t-2 border-x-2 border-gray-200'>
                        <tr className='flex justify-between items-center text-black font-bold text-lg w-7/8'>
                            <th className='w-24 '>#</th>
                            <th className='w-60'>Email</th>
                            <th className='w-96'>Comment </th>
                            <th className='w-48'>Feedback</th>
                            <th className='w-28'>Report </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            commentPerPost.map((comment, index) =>
                                <tr className='flex justify-between items-center border-2 border-l-gray-300 w-full'>
                                    <td className='w-24'>{index + 1}</td>
                                    <td className='w-60'>{comment.email}</td>
                                    <td className='w-96'>
                                        <div className='py-3 overflow-x-ellipsis overflow-clip'>
                                            {comment.comment}
                                        </div>
                                    </td>
                                    <td className='flex gap-2 justify-center items-center w-48 text-xl'>
                                        <form className='flex gap-2'>
                                            <select className='input input-bordered pr-2 w-40 h-8 text-gray-400' onChange={()=>setDisabled(false)}>
                                                <option value="You are not doing the right thing!!">You are not doing the right thing!!</option>
                                                <option value="Against otf the terms and comdition!!">Against otf the terms and comdition!!!!</option>
                                                <option value="You are not doing the right thing!!">You are not doing the right thing!!</option>
                                            </select>
                                            <button className='btn bg-green-300 btn-sm'><RiFeedbackFill></RiFeedbackFill></button>
                                        </form>
                                    </td>
                                    <td className='flex gap-2  justify-center items-center w-28 text-xl'>
                                        <button className='btn btn-sm bg-red-300' disabled={disabled}><BiSolidReport></BiSolidReport></button>
                                    </td>

                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default AllComment;