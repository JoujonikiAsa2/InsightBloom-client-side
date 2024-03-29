import { IoMenuOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import './navlink.css'
import logo1 from '../../assets/web-logo.png'
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import useAnnouncementCount from "../../hooks/useAnnouncementCount";

const Navbar = () => {

    const { user } = useAuth()
    const [totalAnnouncements] = useAnnouncementCount()

    console.log(user?.photoURL)

    // handle the logout button to logout a user
    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
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
                    title: "Sign Out successfully"
                });
            })
            .then(error => console.log(error))
    }


    // navlinks for navbar
    const links =
        <>
            <li>
                <nav className="sidebar">
                    <NavLink to="/">Home</NavLink>
                </nav>
            </li>
            <li>
                <nav className="sidebar">
                    <NavLink to="/membership">Membership</NavLink>
                </nav>
            </li>
            <li>
                <nav className="lg:hidden sidebar indicator">
                    <NavLink>Notification <span class="badge bg-indigo-300">{totalAnnouncements.totalAnnouncement}</span></NavLink>
                </nav>
            </li>
        </>

    return (
        <div className="w-full z-30 absolute bg-transparent">
            <div className="navbar merriweather ">
                <div className="navbar-start  z-30">
                    <div className="drawer lg:hidden">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer">
                                <IoMenuOutline className="text-2xl" />
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-48 min-h-full text-xs merriweather">
                                {/* Sidebar content here */}
                                {links}
                            </ul>
                        </div>
                    </div>
                    <div className="btn btn-ghost text-xl lg:flex hidden merriweather"> <img src={logo1} className="w-10 h-10" alt="" />InsightBloom</div>
                </div>
                <div className="navbar-center">
                    <div className="btn btn-ghost lg:text-xl text-base lg:hidden"><img src={logo1} alt="" className="w-6 h-6 " /><span >InsightBloom</span></div>

                    <ul className=" hidden lg:flex menu menu-horizontal px-1 text-lg  merriweather">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        !user ? <ul className="flex flex-row-reverse gap-2">
                            <li>
                                <nav className="sidebar">
                                    <NavLink to="/signIn" className="btn bg-indigo-500 text-white">Join US</NavLink>
                                </nav>
                            </li>
                            <li>
                                <Link to="/notification" className="hidden lg:flex">
                                    <button className="btn btn-ghost btn-circle mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                    </button>
                                </Link>
                            </li>
                        </ul> :
                            <>

                                <div>
                                    <nav className="lg:flex md:flex hidden sidebar indicator">
                                    <span class="indicator-item right-8 top-1/4 badge bg-indigo-500">{totalAnnouncements.totalAnnouncement}</span>
                                        <Link to="/notification" className="hidden lg:flex">
                                            <button className="btn btn-ghost btn-circle mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                            </button>
                                        </Link>
                                    </nav>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-3">
                                        <div className="lg:w-10 w- rounded-full border-2 border-blue-500">
                                            <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-4 z-[1] p-2 menu menu-sm dropdown-content rounded-box w-52  text-base bg-white">
                                        <li className=" cursor-text ml-3 text-blue-600">{user?.displayName}</li>
                                        <li className="sidebar">
                                            <Link to='/dashboard/userProfile'>Dashboard</Link>
                                        </li>
                                        <li><button onClick={handleLogOut}>Logout</button></li>
                                    </ul>
                                </div>
                            </>
                    }
                </div>
            </div>

        </div>
    );
};

export default Navbar;