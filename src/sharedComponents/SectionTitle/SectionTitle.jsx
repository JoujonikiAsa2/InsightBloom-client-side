import React from 'react';

const SectionTitle = ({heading,details}) => {
    return (
        <div className='text-center py-8'>
            <h2 className='text-xl font-bold text-indigo-500 pb-3'>{heading}</h2>
            <p className='text-xs'>{details}</p>
        </div>
    );
};

export default SectionTitle;