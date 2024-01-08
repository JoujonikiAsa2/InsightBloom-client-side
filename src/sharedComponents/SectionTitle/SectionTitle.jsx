import React from 'react';


const SectionTitle = ({ heading, details }) => {
    return (
        <div className='text-center mt-6 mb-6 righteous'>
            <h2 className='text-xl md:text-2xl lg:text-2xl text-indigo-500'>{heading}</h2>
        </div>
    );
};

export default SectionTitle;