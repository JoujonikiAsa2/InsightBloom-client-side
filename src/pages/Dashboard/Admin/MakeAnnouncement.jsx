
import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import SectionTitle from '../../../sharedComponents/SectionTitle/SectionTitle';
const image_API_key = import.meta.env.VITE_IMAGE_API_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_API_key}`


const MakeAnnouncement = () => {

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const dateTime = new Date()
    const time = dateTime.toLocaleString()

    const {
        handleSubmit, control,
        register,
        formState: { errors }
    } = useForm()

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
            const announcement = {
                authorName: data.authorName,
                authorImage: res.data.data.display_url,
                postTitle: data.postTitle,
                postDescription: data.postDescription,
                time: time,
            }
            axiosPublic.post('/api/announcement', announcement)
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


    return (
        <div>
            <div className='mx-6'>
                <div className='mt-12'>
                    <SectionTitle heading="Make an announcemnet"></SectionTitle>
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
                                <span className="label-text">Post Description*</span>
                            </label>
                            <textarea {...register('postDescription', { required: true })} className="textarea textarea-bordered h-24" placeholder="Post Description"></textarea>
                        </div>
                        <div className="flex justify-center items-center my-3">
                            <button className="btn bg-indigo-500 text-white mb-3">
                                Add Potst
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakeAnnouncement;