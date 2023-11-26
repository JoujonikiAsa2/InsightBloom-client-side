import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../sharedComponents/Loading/Loading';

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth()

    if(user){
        return children
    }

    if(loading){
        return <Loading></Loading>
    }
    return (
        <div>
            
        </div>
    );
};

export default PrivateRoutes;