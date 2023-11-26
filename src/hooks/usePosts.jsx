import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
const usePosts = () => {
    const axiosPublic = useAxiosPublic()

    // load with tanstack query
    const { user } = useAuth();
    const { refetch, data: posts = [] } = useQuery({
        queryKey: 'posts',
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/posts?page=${currentPage}&size=${itemsPerPage}`)
            return res.data
        }
    })
    return [posts,refetch]
};

export default usePosts;