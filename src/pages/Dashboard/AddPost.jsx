import React from 'react';
import SectionTitle from '../../sharedComponents/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';

const AddPost = () => {

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

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className=' ml-28 md:ml-48 lg:ml-64'>
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
                        <textarea {...register('postDescription')} className="textarea textarea-bordered h-24" placeholder="Post Description"></textarea>
                    </div>
                    <div className="form-control lg:w-full my-3">
                        <label className="label">
                            <span className="label-text">Tag*</span>
                        </label>
                        <select defaultValue="default" {...register('category', { required: true })}
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
                        <button className="btn bg-indigo-500 text-white mb-3">
                            Add Potst
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPost;