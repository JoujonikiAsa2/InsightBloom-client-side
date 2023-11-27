import { FaHome, FaList, FaUsers, } from 'react-icons/fa';
import { RiCalendarFill,} from 'react-icons/ri';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { BsPostcardHeartFill, BsPersonCircle, BsReceiptCutoff } from "react-icons/bs";
import Loading from '../sharedComponents/Loading/Loading';
import useAdmin from '../hooks/useAdmin';


const Dashboard = () => {

    const [isAdmin,isAdminLoading] = useAdmin()
    console.log(isAdmin)

    if(isAdminLoading){
        return <Loading></Loading>
    }

    return (
        <div className='flex flex-row-reverse min-h-screen '>
            <div className='lg:w-64 bg-[#364253] fixed h-full overflow-y-auto z-30 text-white'>
                <ul className='menu p-4 text-md'>
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
                                    <NavLink to="/dashboard/paymentHistory">
                                        <BsPostcardHeartFill className=' text-xl'></BsPostcardHeartFill >
                                        My Post</NavLink>
                                </li>
                            </>
                    }
                    <div className='divider bg-white h-[2px]'></div>
                    {/* shared navlink */}
                    <li>
                        <NavLink to='/'><FaHome className=' text-xl'></FaHome> Home</NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex-1 mr-56'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;