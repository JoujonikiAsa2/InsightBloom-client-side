import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { BiBookContent, BiSolidCommentDetail } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { axiosPublic } from '../../../hooks/useAxiosPublic';


const AdminProfile = () => {

    const { user, loading } = useAuth()

    const { refetch: refetch, data: comments = [] } = useQuery({
        queryKey: 'totalComment',
        queryFn: async () => {
            const res = await axiosPublic.get('/commentCount')
            return res.data
        }
    })

    // console.log("From line 17 [adminProfile] ", comments)

    const { refetch: commentRefech, data: posts = [] } = useQuery({
        queryKey: 'totalPosts',
        queryFn: async () => {
            const res = await axiosPublic.get('/api/totalPost')
            return res.data
        }
    })

    // console.log("From line 27 [adminProfile] ", posts)

    const { refetch: userRefech, data: users = [] } = useQuery({
        queryKey: 'totalUsers',
        queryFn: async () => {
            const res = await axiosPublic.get('/userCount')
            return res.data
        }
    })

    // console.log("From line 37 [adminProfile] ", users)


    const data = [
        { name: 'Totaml Users', value: users.totalUser },
        { name: 'Total Posts', value: posts.totalPost },
        { name: 'Total Comments', value: comments.totalComment },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];


    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const handleTag = (e) => {
        e.preventDefault()
        const form = e.target
        const tag = form.tag.value
        const tagString = {
            tag: tag
        }
        axiosPublic.post('/tags', tagString)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Tag added successfully',
                        icon: 'success'
                    })
                }

            })
            .catch(error => {
                console.log(error)
                Swal.fire({
                    title: 'Failed to added',
                    icon: 'error'
                })
            })
        form.reset()
    }

    return (
        <div>
            <Helmet>
                <title>Dashboard | Pdmin Profile</title>
            </Helmet>
            <div className="avatar flex flex-col gap-3 justify-center items-center pt-12 ">
                <div className="w-16 lg:w-20 rounded-full relative bg-slate-500">
                    <img src={user?.photoURL} />
                </div>
                <h5 className='text-xs text-purple-800 righteous lg:text-2xl capitalize'>{user?.displayName}</h5>
                <p className='text-xs'>{user?.email}</p>
                <form onSubmit={handleTag}>
                    <div className='join'>
                        <input type="text" name='tag' placeholder='Add Tag in lowercase' className='input input-bordered input-sm' />
                    </div>
                    <button className='btn btn-sm'>Add Tag</button>
                </form>
            </div>
            <div className='divider'></div>
            <div className="stats lg:stats-horizontal gap-8 shadow w-[500] flex flex-col justify-center items-center">
                <div className="stat">
                    <div className="stat-figure text-secondary w-10 lg:w-36">
                        <FaUsers className='text-3xl'></FaUsers>
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{users.totalUser}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary w-10 lg:w-36">
                        <BiBookContent className='text-3xl'></BiBookContent>
                    </div>
                    <div className="stat-title">Total Posts</div>
                    <div className="stat-value">{posts.totalPost}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary w-10 lg:w-36">
                        <BiSolidCommentDetail className='text-3xl'></BiSolidCommentDetail>
                    </div>
                    <div className="stat-title">Total Comments</div>
                    <div className="stat-value">{comments.totalComment}</div>
                </div>
            </div>
            <div className='col-span-3'>
                <PieChart width={350} height={250}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend></Legend>
                </PieChart>

            </div>
        </div >
    );
};


export default AdminProfile;