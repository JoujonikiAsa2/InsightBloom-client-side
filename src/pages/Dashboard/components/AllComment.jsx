import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BiSolidReport } from 'react-icons/bi'
import { useQuery } from '@tanstack/react-query';
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { axiosPublic } from '../../../hooks/useAxiosPublic';
import ReactEllipsisText from 'react-ellipsis-text';


const AllComment = () => {
    const { id } = useParams();
    const [clicked, setClicked] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [report, setReport] = useState("")

    const location = useLocation()
    const navigate = useNavigate()

    const { user } = useAuth()
    // console.log(location)

    // fatching post data by id
    const { isLoading, error, refetch, data: post = [] } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/post/${id}`);
            return res.data;
        },
    })

    const { refetch: refaching, data: comments = [] } = useQuery({
        queryKey: ['comment'],
        queryFn: async () => {
            const res = await axiosPublic.get('/api/comments');
            return res.data;
        },
    })

    const { refetch: reFetch, data: comment = [] } = useQuery({
        queryKey: ['/comments/count'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/comments/count`)
            return res.data
        }
    })

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

    const myReport = (comment_id, commenter_email) => {
        const feedback = {
            comment_id: comment_id,
            report: report,
            commenter_email: commenter_email,
            repoter_email: user.email,
            action: 'not deleted'
        }
        console.log("Report from my report", { feedback: feedback })
        axiosPublic.post('/api/reports', feedback)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Reported Successfully",
                        showConfirmButton: false,
                        timer: 1000,
                    });
                }

            })
            .catch(error => console.log(error))
        setDisabled(true)
    }

    return (
        <div className='mt-4'>

            {/* All comment */}
            <div className='bg-white rounded-xl min-h-content p-8 mb-20 '>
                <h2 className='text-xl font-bold py-4'>Comments</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
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
                                    <tr className=''>
                                        <td className='w-24'>{index + 1}</td>
                                        <td className='w-60'>{comment.email}</td>
                                        <td className='w-96 flex items-center gap-2'>
                                            <div className=''>
                                                <ReactEllipsisText text={comment.comment} length={"20"} />
                                            </div>
                                            {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                            <button className="btn btn-sm text-xs" onClick={() => document.getElementById(`${index}`).showModal()}>Read More</button>
                                            <dialog id={`${index}`} className="modal">
                                                <div className="modal-box">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    </form>
                                                    <h3 className="font-bold text-lg">Hello!</h3>
                                                    <p className="py-4">{comment.comment}</p>
                                                </div>
                                            </dialog>
                                        </td>
                                        <td className=''>
                                            <select className='input input-bordered pr-2 w-40 h-8 text-gray-400' onChange={(e) => {
                                                setReport(e.target.value)
                                                setDisabled(false)
                                            }}>
                                                <option value="spam">Spam</option>
                                                <option value="harassment">Harassment</option>
                                                <option value="inappropriate content">Inappropriate content,</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button className='btn btn-sm bg-red-300' onClick={() => myReport(comment._id, comment.email)} disabled={disabled}><BiSolidReport></BiSolidReport></button>
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


export default AllComment;