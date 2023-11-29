import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "./useAxiosPublic";

const useAnnouncement = () => {
    const { refetch, data: announcements = [] } = useQuery({
        queryKey: 'announcements',
        queryFn: async () => {
            const res = await axiosPublic.get('/api/announcement')
            return res.data
        }
    })
    return [announcements,refetch]
};

export default useAnnouncement;