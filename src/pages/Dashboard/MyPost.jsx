import React, { useState } from 'react';
import SectionTitle from '../../sharedComponents/SectionTitle/SectionTitle';
import useAuth from '../../hooks/useAuth';
import useUserPost from '../../hooks/useUserPost';
import { BiSolidComment, BiSolidDownvote, BiSolidUpvote } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import usePost from '../../hooks/usePost';
import { useQuery } from '@tanstack/react-query';
import { axiosPublic } from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyPost = () => {
    const { user } = useAuth()

    const { refetch, data: userPost = [] } = useQuery({
        queryKey: ["userPost", user?.email],
        queryFn: async () => {
            const result = await axiosPublic.get(`/post/${user.email}`)

            return result.data
        }
    })

    console.log(userPost)

    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/api/post/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your post has been deleted.",
                                icon: "success"
                            });

                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: `${error.message}`,
                            icon: "error"
                        });
                    })
            }
        });
    }

    return (
        <div>
            <div>
                <SectionTitle heading="My Post"></SectionTitle>
                <div className=' bg-white rounded  mx-12 my-6'>
                    <div className='flex justify-between users-center py-3'>
                        <h2 className='text-lg font-semibold'>Total posts: {userPost.length} </h2>
                    </div>
                    <div className="overflow-x-auto rounded-2xl">
                        <table className="table  w-full">
                            {/* head */}
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Post Title</th>
                                    <th>Number Of Votes</th>
                                    <th>Comment</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userPost.map((post, index) => <tr>
                                        <td className='text-lg font-bold'>{index + 1}</td>
                                        <td>{post.postTitle}</td>
                                        <td>
                                            <div className='flex gap-3'>
                                                <div className='flex justify-center items-center text-lg'>
                                                    <BiSolidUpvote></BiSolidUpvote>{post.upVote}
                                                </div>
                                                <div className='flex justify-center items-center text-lg'>
                                                    <BiSolidDownvote></BiSolidDownvote>{post.downVote}
                                                </div>
                                            </div>
                                        </td>
                                        <td><Link to={`/dashboard/allComment/${post._id}`}><button className='btn btn-sm text-white tex-white bg-slate-500 flex justify-center items-center gap-2'>Commnet</button></Link></td>
                                        <td><button  onClick={() => handleDelete(post._id)} className='btn btn-sm tex-white bg-red-500 flex justify-center items-center gap-2'><MdDelete className='text-2xl'></MdDelete></button></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MyPost;