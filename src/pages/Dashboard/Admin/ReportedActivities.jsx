import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { axiosPublic } from '../../../hooks/useAxiosPublic';
import { MdDoneOutline } from "react-icons/md";
import { RiDeleteBin2Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';

const ReportedActivities = () => {

    const [deleted, setDeleted] = useState(false)

    const { refetch, data: reports = [] } = useQuery({
        queryKey: 'reports',
        queryFn: async () => {
            const res = await axiosPublic.get('/api/reports')
            return res.data
        }
    })

    console.log(reports)

    const handleDelete = (comment_id, reportId) => {
        console.log(comment_id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then(result => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/api/comments/${comment_id}`)
                    .then(res => {
                        console.log(res.user)
                        if (res.data.deletedCount > 0) {
                            refetch()

                            Swal.fire({
                                title: "Deleted!",
                                text: "The comment deleted successfully.",
                                icon: "success"
                            });
                            axiosPublic.patch(`/api/reports/${reportId}`)
                            .then(res=>console.log(res.data))
                            .catch(error=>console.log(error))
                        }
                        else {
                            refetch()
                            Swal.fire({
                                title: "Opps!",
                                text: "The comment already deleted!",
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

        if(!comment_id){
            setDeleted(true)
        }
    }

    return (
        <div className='mt-4'>

            {/* All comment */}
            <div className='bg-white rounded-xl min-h-content p-8 mb-20 '>
                <h2 className='text-xl font-bold py-4'>All reports</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className='w-24 '>#</th>
                                <th className='w-60'>Reporter Email</th>
                                <th className='w-96'>Commentter Email </th>
                                <th className='w-48'>Feedback</th>
                                <th className='w-48'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reports.map((report, index) =>
                                    <tr className=''>
                                        <td className='w-24'>{index + 1}</td>
                                        <td className='w-60'><p>{report.repoter_email}</p></td>
                                        <td className='w-96'>
                                            <p>{report.commenter_email}</p>
                                        </td>
                                        <td className=''>
                                            <p className='capitalize'>{report.report}</p>
                                        </td>
                                        <td className=''>
                                            {
                                                report.action == 'deleted' ? <button className='btn btn-sm bg-green-300'><MdDoneOutline></MdDoneOutline></button>
                                                 : <button className='btn btn-sm bg-red-300'  onClick={() => handleDelete(report.comment_id, report._id)}><RiDeleteBin2Fill></RiDeleteBin2Fill></button>
                                            }
                                            
                                        </td>

                                    </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportedActivities;