import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { axiosPublic } from './useAxiosPublic';

const useAnnouncementCount = () => {
    const { refetch, data: totalAnnouncements = [] } = useQuery({
        queryKey: 'totalAnnouncement',
        queryFn: async () => {
            const res = await axiosPublic.get('/announcementCount')
            return res.data
        }
    })
    return [totalAnnouncements, refetch]
};

export default useAnnouncementCount;