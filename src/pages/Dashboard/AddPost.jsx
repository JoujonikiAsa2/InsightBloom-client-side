import React, { useEffect, useState } from 'react';
import SectionTitle from '../../sharedComponents/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useUserPost from '../../hooks/useUserPost';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
const image_API_key = import.meta.env.VITE_IMAGE_API_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_API_key}`

const AddPost = () => {

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const dateTime = new Date()
    const time = dateTime.toLocaleString()
    const userPost = useUserPost()

    console.log(time)
    const {
        handleSubmit, control,
        register,
        formState: { errors }
    } = useForm(
        {
            defaultValues: {
                // Set default values for your form fields
                upVote: 0,
                downVote: 0,
            },
        }
    )

    const [userDetails, setUserDetails] = useState([])

    useEffect(() => {
        axiosPublic.get(`/users/email/${user.email}`)
            .then(res => {
                setUserDetails(res.data)
            })
            .catch(error => console.log(error))
    }, [])


    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.authorImage[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data.data.display_url)

        if (res.data.success) {
            const post = {
                authorName: data.authorName,
                authorEmail: data.authorEmail,
                tag: data.tag,
                authorImage: res.data.data.display_url,
                postTitle: data.postTitle,
                postDescription: data.postDescription,
                upVote: data.upVote,
                downVote: data.downVote,
                time: time,
                comment: 0
            }
            axiosPublic.post('/api/post', post)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(error => console.log(error))
        }
    }

    console.log(userDetails)

    return (
        <div>
            <div className='mx-6'>
                <div className='mt-12'>
                    <SectionTitle heading="Add a Post" subHeading="What's New?"></SectionTitle>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-11/12">
                        <div className='form-control lg:w-full my-3'>
                            <label className="label">
                                <span className="label-text">Author Image*</span>
                            </label>
                            <input type='file'
                                {...register('authorImage', { required: true })}
                                className="input input-bordered lg:w-full pt-2" />
                        </div>
                        <div className="form-control lgLw-full my-3">
                            <label className="label">
                                <span className="label-text">Author Name*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Author Name"
                                name='authorName'
                                {...register('authorName', { required: true })}
                                required
                                className="input input-bordered lg:w-full" />
                        </div>
                        <div className="form-control lg:w-full my-3">
                            <label className="label">
                                <span className="label-text">Author Email*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="authorEmail"
                                {...register('authorEmail', { required: true })}
                                required
                                className="input input-bordered lg:w-full" />
                            <div className="ml-5 text-white pt-2">
                                {errors.authorEmail && <span className="text-red-400">This field is required</span>}
                            </div>
                        </div>
                        <div className="form-control lg:w-full my-3">
                            <label className="label">
                                <span className="label-text">Post Title*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Post Title"
                                {...register('postTitle', { required: true })}
                                required
                                className="input input-bordered lg:w-full" />
                        </div>

                        {/* post details */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Post Description</span>
                            </label>
                            <textarea {...register('postDescription', { required: true })} className="textarea textarea-bordered h-24" placeholder="Post Description"></textarea>
                        </div>
                        <div className="form-control lg:w-full my-3">
                            <label className="label">
                                <span className="label-text">Tag*</span>
                            </label>
                            <select defaultValue="default" {...register('tag', { required: true })}
                                className="select select-bordered lg:w-full">
                                <option disabled>Select a category</option>
                                <option value="web development">Web Development</option>
                                <option value="cooking">Cooking</option>
                                <option value="fitness">Fitness</option>
                                <option value="programming">Programming</option>
                                <option value="machine learning">Machine Learning</option>
                                <option value="gerdening">Gerdening</option>
                            </select>
                        </div>
                        <div className='flex lg:flex-row flex-col gap-3 w-full'>
                            <div className="form-control lg:w-full lg:my-3">
                                <label className="label">
                                    <span className="label-text">Up Vote(0 By Default)</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    {...register('upVote', { required: true })}
                                    disabled
                                    className="input input-bordered  lg:w-full" />
                            </div>
                            <div className="form-control lg:w-full my-3">
                                <label className="label">
                                    <span className="label-text">Down Vote(0 By Default)</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    {...register('downVote', { required: true })}
                                    disabled
                                    className="input input-bordered  lg:w-full" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center my-3">
                            <button className="btn bg-indigo-500 text-white mb-3" disabled={userDetails.membership == "bronze" && userPost.length >= 5 ? true : false}>
                                Add Potst
                            </button>
                            <Link to='/membership'>
                                <button className={(userDetails.membership == "bronze" && userPost.length >= 5) && 'btn bg-indigo-500 text-white mb-3 hidden'}>
                                    Become a Member
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPost;