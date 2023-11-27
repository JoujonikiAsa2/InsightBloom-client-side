import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAuth from './useAuth';
export const axiosSecure = axios.create({
    baseURL: "http://localhost:5001"
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { signOut } = useAuth()

    
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log("Request stopped by interceptors", token)
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    });


    // interceptor 401, 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (error) => {
        console.log('status: ', error)
        const status = error.response.status

        if (status === 401 || status == 403) {
            navigate('/signIn')
            await signOut()

        }
        return Promise.reject(error)
    });
    return axiosSecure

}

export default useAxiosSecure;