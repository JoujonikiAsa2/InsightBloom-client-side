import { IoMenuOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import './navlink.css'

const Navbar = () => {

    const user = true

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
        </>

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="drawer lg:hidden">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer">
                                <IoMenuOutline />
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-56 min-h-full bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                {links}
                            </ul>
                        </div>
                    </div>
                    <a className="btn btn-ghost text-xl lg:flex hidden">InsightBloom</a>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost lg:text-xl text-lg lg:hidden overflow-auto">InsightBloom</a>

                    <ul className=" hidden lg:flex menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        !user ? <ul>
                            <li>
                                <nav className="sidebar">
                                    <NavLink to="/joinUs">Join US</NavLink>
                                </nav>
                            </li>
                        </ul> : ""
                    }
                    {
                        user &&
                        <>
                            <Link to="/notification">
                                <button className="btn btn-ghost btn-circle mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                </button>
                            </Link>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src="https://i.ibb.co/ZJVCL0t/Rectangle-2097-12.png" />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><a>Logout</a></li>
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