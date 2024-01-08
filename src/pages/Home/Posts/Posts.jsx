import React, { useEffect, useState } from 'react';
import Post from './components/Post';
import './style.css'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Posts = ({ searchValue }) => {
    const axiosPublic = useAxiosPublic()

    console.log(searchValue)

    // total document count 
    const [totalPosts, setTotalPosts] = useState()

    useEffect(() => {
        const url = searchValue
            ? `/searchResult/${searchValue}`
            : `/api/totalPost`;

        axiosPublic.get(url)
            .then(res => {
                console.log(res.data.totalPost)
                setTotalPosts(res.data.totalPost)
            })
            .catch(error => console.log(error))
    }, [])

    console.log(totalPosts)

    const [posts, setPosts] = useState([])

    // number of items per page
    const itemsPerPage = 5;

    //total number of page
    const numberOfPages = Math.ceil(totalPosts / 5)

    // upadte current page by this hook
    const [currentPage, setCurrentPage] = useState(0)

    // Loaded data

    useEffect(() => {
        // Check if searchValue is present
        const url = searchValue
            ? `/posts/${searchValue}?page=${currentPage}&size=${itemsPerPage}`
            : `/api/post?page=${currentPage}&size=${itemsPerPage}`;

        axiosPublic.get(url)
            .then(res => setPosts(res.data))
            .catch(error => console.log(error));
    }, [currentPage, itemsPerPage, searchValue]);

    // Set the current page on click the prev and next btn
    const [activeBg, setActiveBg] = useState(null)

    // make an array of the pages
    const pages = Array.from({ length: numberOfPages }, (_, index) => index);

    console.log("Pages", pages)

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
            setActiveBg("blue-500")
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
            setActiveBg("blue-500")
        }
    }
    // filtered data by popularity
    const handlePopularButton = () => {
        // setUrl('')
        axiosPublic.get(`/api/post/popular?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => setPosts(res.data))
            .catch(error => console.log(error))
        console.log('I am clicked')
    }

    return (
        <div className='bg-white px-8 py-4 rounded-xl'>

            <div className='mb-4'>
                <button className='btn btn-sm bg-[#31304D] text-white' onClick={handlePopularButton}>Sort by Popularity</button>
            </div>

            <div className='grid grid-cols-1 gap-4'>
                {
                    posts.length > 0 ? <>
                        {
                            posts.map((post, index) => <Post key={post._id} post={post} index={index}></Post>)
                        }
                    </>
                        :
                        <h2 className='w-[80vw] text-center font-bold text-2xl'>No match post</h2>
                }
            </div>
            <div className='my-6 col-span-3 flex justify-center items-center gap-2'>
                {
                    posts.length > 0 ?
                        <div className="pagination">
                            <div className='mr-2 lg:mr-0 md:mr-0'>
                                <button className="" onClick={handlePreviousPage}>
                                    <FaArrowLeft />
                                </button></div>
                            <div className='hidden lg:flex md:flex justify-center items-center'>
                                {
                                    pages.map(page => <button className={currentPage === page ? "btn btn-circle selected text-white" : 'btn btn-circle border-[1px] shadow-sm ml-3'} key={page} onClick={() => {
                                        setCurrentPage(page)
                                        refetch()
                                    }}>{page}</button>)
                                }
                            </div>
                            <div>
                                <button className="ml-4" onClick={handleNextPage}><FaArrowRight></FaArrowRight></button>
                            </div>

                        </div>
                        : ""
                }
            </div>
        </div >
    );
};

export default Posts;