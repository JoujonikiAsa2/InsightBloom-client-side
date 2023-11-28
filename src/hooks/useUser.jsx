import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosPublic } from "./useAxiosPublic";

const useUser = () => {
    const {user} = useAuth()
    const {refetch, data: users = []} = useQuery({
        queryKey: '/users',
        queryFn: async()=>{
            const res =  await axiosPublic.get('/users')
            return res.data
        }
    })

    return [refetch, users]
};

export default useUser;