import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: "https://b8a12-forum-server-side.vercel.app"
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;