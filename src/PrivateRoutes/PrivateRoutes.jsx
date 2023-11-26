import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../sharedComponents/Loading/Loading';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth()

    if(user){
        return children
    }

    if(loading){
        return <Loading></Loading>
    }
    return (
        <Navigate to='/signIn' state={location.pathname}></Navigate>
    );
};

export default PrivateRoutes;