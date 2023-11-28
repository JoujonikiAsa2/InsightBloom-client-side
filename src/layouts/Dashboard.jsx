import { FaHome, FaList, FaUsers, } from 'react-icons/fa';
import { RiCalendarFill, } from 'react-icons/ri';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { BsPostcardHeartFill, BsPersonCircle, BsReceiptCutoff } from "react-icons/bs";
import Loading from '../sharedComponents/Loading/Loading';
import useAdmin from '../hooks/useAdmin';
import { IoMenuOutline } from 'react-icons/io5';


const Dashboard = () => {

    const [isAdmin, isAdminLoading] = useAdmin()
    console.log(isAdmin)


    const links = <>
        {
            isAdmin ? <>
                <li>
                    <NavLink to='/dashboard/adminProfile'><FaHome className=' text-xl'></FaHome> Admin Profile</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/createAnnouncement'><FaList className=' text-xl'></FaList>Make Announcement</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/manageUsers'><RiCalendarFill className=' text-xl'></RiCalendarFill> Manage Users</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/manageComments'><FaUsers className=' text-xl'></FaUsers> Reported Activities</NavLink>
                </li>
            </> :
                <>
                    <li>
                        <NavLink to='/dashboard/userProfile'><BsPersonCircle className=' text-xl'></BsPersonCircle > User Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/addPost'><BsReceiptCutoff className=' text-xl'></BsReceiptCutoff  > Add Post</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myPost">
                            <BsPostcardHeartFill className=' text-xl'></BsPostcardHeartFill >
                            My Post</NavLink>
                    </li>
                </>
        }
    </>

    if (isAdminLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='flex flex-row min-h-screen '>
            <div className='w-48  bg-[#99a6b9] fixed h-full text-black lg:flex hidden'>
                <ul className='menu p-2 text-xs righteous'>
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to='/dashboard/adminProfile'><FaHome className=' text-xs'></FaHome> Admin Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/createAnnouncement'><FaList className=' text-xs'></FaList>Make Announcement</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageUsers'><RiCalendarFill className=' text-xs'></RiCalendarFill> Manage Users</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageComments'><FaUsers className=' text-xs'></FaUsers> Reported Activities</NavLink>
                                </li>
                            </> :
                            <>
                                <li>
                                    <NavLink to='/dashboard/userProfile'><BsPersonCircle className=' text-xs'></BsPersonCircle > User Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/addPost'><BsReceiptCutoff className=' text-xs'></BsReceiptCutoff  > Add Post</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myPost">
                                        <BsPostcardHeartFill className=' text-xs'></BsPostcardHeartFill >
                                        My Post</NavLink>
                                </li>
                            </>
                    }
                    <div className='divider bg-white h-[2px]'></div>
                    {/* shared navlink */}
                    <li>
                        <NavLink to='/'><FaHome className=' text-xs'></FaHome> Home</NavLink>
                    </li>
                </ul>
            </div>
            <div className="drawer lg:hidden z-30 absolute">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">

                    <label htmlFor="my-drawer">
                        <IoMenuOutline className="text-2xl" />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-48 min-h-full bg-base-200 text-xs righteous">
                        {links}
                    </ul>
                </div>
            </div>
            <div className='flex-1 lg:ml-[195px] ml-0'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;