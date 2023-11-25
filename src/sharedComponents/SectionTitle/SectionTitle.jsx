import React from 'react';

const SectionTitle = ({heading,details}) => {
    return (
        <div className='text-center mt-20 mb-8 ' data-aos="fade-up">
            <h2 className='text-3xl font-bold text-indigo-500'>{heading}</h2>
            <div className='divider w-1/4 bg-purple-700 h-1 mx-auto'></div>
            <p className='text-xs'>{details}</p>
        </div>
    );
};

export default SectionTitle;