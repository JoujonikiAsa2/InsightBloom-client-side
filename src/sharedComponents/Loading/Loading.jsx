import React from 'react';
import loading from './loading.json'
import Lottie from 'lottie-react';

const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <Lottie animationData={loading} style={{height: "150px"}}></Lottie>
        </div>
    );
};

export default Loading;