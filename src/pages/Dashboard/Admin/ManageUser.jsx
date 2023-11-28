import React from 'react';
import SectionTitle from '../../../sharedComponents/SectionTitle/SectionTitle';
import useUser from '../../../hooks/useUser';
import { FaAdn, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { axiosPublic } from '../../../hooks/useAxiosPublic';

const ManageUser = () => {

    const [refetch, users] = useUser()
    console.log(users)

    // Help to handle edit the roll of an user
    const handleUserRole = (user) => {
        console.log(user)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make admin!"
        }).then(result => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/users/admin/${user.name}`)
                    .then(res => {
                        console.log(res.user)
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Added!",
                                text: "The user added as admin.",
                                icon: "success"
                            });
                        }
                        else{
                            refetch()
                            Swal.fire({
                                title: "Already Added!",
                                text: "The user already added as admin.",
                                icon: "error"
                            });

                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error!",
                            text: `${error.message}`,
                            icon: "error"
                        });
                    })
            }
        })
    }

    return (
        <div>
            <div>
                <SectionTitle heading="Manage User"></SectionTitle>
                <div className=' bg-white rounded  mx-12 my-6'>
                    <div className='flex justify-between users-center py-3'>
                        <h2 className='text-lg font-semibold'>Users: {users.length} </h2>
                    </div>
                    <div className="overflow-x-auto rounded-2xl">
                        <table className="table  w-full">
                            {/* head */}
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>User name</th>
                                    <th>User email</th>
                                    <th>Make admin</th>
                                    <th>Subscription Status(Membership)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => <tr>
                                        <td className='text-lg font-bold'>{index + 1}</td>
                                        <td className='capitalize'>{user.name}</td>
                                        <td>{user.email}</td>
                                        {
                                            user.role !== "admin" ? <td>
                                                <button className='btn btn-sm bg-still-600' onClick={() => handleUserRole(user)}>
                                                    Make Admin</button>
                                            </td> :
                                                <td>
                                                    <button className='btn btn-sm bg-green-600' onClick={() => handleUserRole(user)}>
                                                        Admin<FaAdn></FaAdn></button>
                                                </td>
                                        }
                                        <td className='capitalize'>{user.membership}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ManageUser;