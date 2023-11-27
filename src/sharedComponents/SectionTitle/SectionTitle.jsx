import React from 'react';


const SectionTitle = ({ heading, details }) => {
    return (
        <div className='text-center mt-6 mb-6 righteous'>
            <h2 className='text-xl md:text-2xl lg:text-2xl text-indigo-500'>{heading}</h2>
            <div className='divider w-1/4 bg-purple-700 h-1 mx-auto'></div>
            <div className='w-1/2 mx-auto mt-6'>
                <p className='text-xs'>{details}</p>
            </div>
        </div>
    );
};

export default SectionTitle;