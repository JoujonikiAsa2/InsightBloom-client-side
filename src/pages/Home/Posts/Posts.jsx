import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../sharedComponents/SectionTitle/SectionTitle';
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
        // console.log("Active bg", activeBg)
        // console.log("You clicked on page", currentPage)

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
                <SectionTitle heading="Posts of our forum" details=" This section serves as a centralized hub for accessing a diverse range of discussions and information within our forum community. Here, users can explore and engage with a variety of posts covering different topics and categories"></SectionTitle>

                <div className='flex justify-center mb-8'>
                    <button className='btn bg-indigo-400 text-white' onClick={handlePopularButton}>Sort by Popularity</button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center justify-items-center gap-12'>
                    {
                        posts.map((post, index) => <Post key={post._id} post={post} index={index}></Post>)
                    }
                </div>
                <div className='my-6 col-span-3 flex justify-center items-center gap-2'>
                    <div className="pagination">
                        <div>
                            <button className="btn border-[1px] border-gray-400" onClick={handlePreviousPage}>
                                <FaArrowLeft />
                            </button></div>
                        {
                            pages.map(page => <button className={currentPage === page ? "btn btn-circle selected text-white" : 'btn btn-circle border-[1px] border-gray-400 m-[5px]'} key={page} onClick={() => {
                                setCurrentPage(page)
                                refetch()
                            }}>{page}</button>)
                        }
                        <div><button className="btn border-[1px] border-gray-400" onClick={handleNextPage}><FaArrowRight></FaArrowRight></button></div>

                    </div>
                </div>
            </div >
        );
    };

    export default Posts;