import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import loginPhoto from './signIn.json'
import { MdOutlineMail } from "react-icons/md";
import { RiGithubFill, RiGoogleFill, RiLockPasswordLine } from "react-icons/ri";
import './login.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";


// SIgnUp form
const Login = () => {

    const { login, googleLogin, gitHubLogin } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // get data on submit the form
    const onSubmit = data => {
        console.log(data)
        login(data.email, data.password)
            .then(res => {
                console.log(res)
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
    };

    // handle social media login
    const handleGoogle = () => {
        googleLogin()
            .then(res => {
                console.log("User by Google Sign In", res.user)
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
                console.log("User by gitHub Sign In", res.user)
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
        <div className="max-w-[2200px] mx-auto h-[700px] flex flex-col justify-center items-center">
            <Helmet>
                <title>InsightBloom | SignIn</title>
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
                <div className="flex justify-center items-center pb-8 border-t-2 border-lightblue px-8">
                    <div className="">
                        <Lottie animationData={loginPhoto} className="h-96"></Lottie>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="flex gap-2 justify-center items-center">
                                    <MdOutlineMail ></MdOutlineMail>
                                    <input
                                        placeholder="Enter your email address..."
                                        name="email"
                                        {...register("email", { required: true })} className="input input-bordered w-72" />
                                </div>
                                <div>
                                    {errors.email && <span className="text-red-400 pt-2">This field is required</span>}

                                </div>
                            </div>
                            <div>
                                <div className="flex gap-2 justify-center items-center">
                                    <RiLockPasswordLine ></RiLockPasswordLine>
                                    <input
                                        placeholder="Enter your password...."
                                        name="password"
                                        type="password"
                                        {...register("password", { required: true })} className="input input-bordered w-72"
                                    />
                                </div>
                                <div>
                                    {errors.password && <span className="text-red-400 pt-2">This field is required</span>}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <input type="submit" value="Sign Up" className="btn my-4 btn-primary  input-bordered w-72 ml-5 text-white" />
                        </div>
                    </form>
                </div>
                {/* Span tag for visit the login page */}
                <div className="flex justify-center items-center pb-4">
                    <p className=" pt-2">New at InsightBloom? <Link to='/joinUs'><span className="text-red-400">Join Us</span></Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;