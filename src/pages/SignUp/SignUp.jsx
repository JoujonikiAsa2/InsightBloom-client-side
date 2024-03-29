import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import signUp from './register.json'
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { RiGithubFill, RiGoogleFill, RiLockPasswordLine } from "react-icons/ri";
import './signUp.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const image_API_key = import.meta.env.VITE_IMAGE_API_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_API_key}`



// SIgnUp form
const SignUp = () => {

    const axiosPublic = useAxiosPublic()
    const { createUser, updateUserProfile, googleLogin, gitHubLogin } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // get data on submit the form
    const onSubmit = async (data) => {
        // console.log(data, data.photo[0])
        const imageFile = { image: data.photo[0] }
        console.log(imageFile)
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data)
        const photo = res.data.data.display_url
        if (res.data.success) {
            createUser(data.email, data.password)
                .then(res => {
                    console.log(res)

                    updateUserProfile(data.name, photo)
                        .then(() => { console.log("Updated") })
                        .catch(error => console.log(error))


                    const userInfo = {
                        name: data.name,
                        email: data.email,
                        role: 'user',
                        membership: "Bronze"
                    }

                    axiosPublic.post('/api/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                console.log("user added to the database")
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                        toast.onmouseenter = Swal.stopTimer;
                                        toast.onmouseleave = Swal.resumeTimer;
                                    }
                                });
                                Toast.fire({
                                    icon: "success",
                                    title: "Signed in successfully"
                                });
                            }
                        })
                    navigate('/signIn')
                })
                .catch(error => {
                    console.log(error)
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Signed up failed",
                        text: `${error.message.slice(10, error.message.length - 1)}`
                    });
                })
        }
    };

    // handle social media login
    const handleGoogle = () => {
        googleLogin()
            .then(res => {
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    role: 'user',
                    membership: "Bronze"
                }

                axiosPublic.post('/api/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log("user added to the database")
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.onmouseenter = Swal.stopTimer;
                                    toast.onmouseleave = Swal.resumeTimer;
                                }
                            });
                            Toast.fire({
                                icon: "success",
                                title: "Signed in successfully"
                            });
                        }
                    })
                navigate(location.state || '/')
            })
            .catch(error => {
                console.log(error)
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "Signed in failed",
                    text: `${error.message.slice(10, error.message.length - 1)}`
                });
            })
    }
    const handleGitHub = () => {
        gitHubLogin()
            .then(res => {
                const userInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    role: 'user',
                    membership: "Bronze"
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log("user added to the database")
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.onmouseenter = Swal.stopTimer;
                                    toast.onmouseleave = Swal.resumeTimer;
                                }
                            });
                            Toast.fire({
                                icon: "success",
                                title: "Signed in successfully"
                            });
                        }
                    })
                navigate(location.state || '/')
            })
            .catch(error => {
                console.log(error)
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "Signed in failed",
                    text: `${error.message.slice(10, error.message.length - 1)}`
                });
            })
    }

    return (
        <div className="max-w-[2200px] mx-auto lg:h-[700px] flex flex-col justify-center items-center sm:py-12">
            <Helmet>
                <title>InsightBloom | SignUp</title>
            </Helmet>
            <div>
                <h2 className="text-xl merriweather font-bold py-6">InsightBloom</h2>
            </div>
            <div className="flex flex-row-reverse gap-3">
                <button className="flex gap-2 justify-center items-center btn bg-purple-500" onClick={handleGoogle}><RiGoogleFill className="text-[#f2ea05] text-xl"></RiGoogleFill> Google</button>
                <button className="flex gap-2 justify-center items-center btn bg-indigo-500" onClick={handleGitHub}><RiGithubFill className="text-[#FFF] text-xl"></RiGithubFill> GitHub</button>
            </div>
            <div className="flex justify-center items-center text-center text-xl font-bold py-6">
                <p>Or</p>
            </div>
            <div className="shadow">
                <div className="flex flex-col ld:flex-col lg:flex-row-reverse justify-center items-center pb-8 border-t-2 border-lightblue px-8">
                    <div className="">
                        <Lottie animationData={signUp} className="h-96"></Lottie>
                    </div>

                    {/* Form for the sign up page */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4 pt-8">
                            <div>
                                <div className="flex gap-2 justify-center items-center">
                                    <IoDocumentTextOutline  ></IoDocumentTextOutline  >
                                    <input
                                        placeholder="Enter your name here....."
                                        name="name"
                                        {...register("name", { required: true })} className="input input-bordered w-72"
                                    />
                                </div>
                                <div className="ml-5 text-white pt-2">
                                    {errors.name && <span className="text-red-400">This field is required</span>}
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-2 justify-center items-center">
                                    <MdAddPhotoAlternate ></MdAddPhotoAlternate >
                                    <input
                                        type="file"
                                        placeholder="Enter your photo URL here....."
                                        name="photo"
                                        {...register("photo", { required: true })} className="input input-bordered w-72 pt-2" />
                                </div>
                                <div className="ml-5 text-white pt-2">
                                    {errors.photo && <span className="text-red-400">This field is required</span>}
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-2 justify-center items-center">
                                    <MdOutlineMail ></MdOutlineMail>
                                    <input
                                        placeholder="Enter your email here....."
                                        name="email"
                                        {...register("email", { required: true })} className="input input-bordered w-72" />
                                </div>
                                <div className="ml-5 text-white pt-2">
                                    {errors.email && <span className="text-red-400">This field is required</span>}
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-2 justify-center items-center">
                                    <RiLockPasswordLine></RiLockPasswordLine>
                                    <input type="password" name="password"  {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,20}/
                                    })} placeholder="password" className="input input-bordered w-72" />
                                </div>
                                <div className="ml-5 text-white pt-2">
                                    {errors.password?.type === "required" && <span className='text-xs text-red-600'>Password is required</span>}
                                    {errors.password?.type === "minLength" && <span className='text-xs text-red-600'>Password should be 6 character or longer</span>}
                                    {errors.password?.type === "maxLength" && <span className='text-xs text-red-600'>Password should be less then 20 character</span>}
                                    {errors.password?.type === "pattern" && <span className='text-xs text-red-600'>Minimum six characters, at least one letter, one number and one special character</span>}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <input type="submit" value="Sign In" className="btn my-4 btn-primary  input-bordered w-72 ml-5 text-white" />
                        </div>
                    </form>
                </div>

                {/* Span tag for visit the login page */}
                <div className="flex justify-center items-center pb-4">
                    <p className=" pt-2">Already registerd at InsightBloom? <Link to='/signIn'><span className="text-red-400">Login</span></Link></p>
                </div>
            </div>

        </div>
    );
};

export default SignUp;