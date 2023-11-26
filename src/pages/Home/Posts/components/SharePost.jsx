import React from 'react';
import {
    EmailIcon,
    EmailShareButton,
    LinkedinIcon,
    LinkedinShareButton,
} from 'react-share';

const SharePost = () => {

    const postUrl = 'http://localhost:5173/postDetails/65623f8479df595f7c0f620d'; 
    const linkedinUrl = 'https://example.com'; 

    return (
        <div className='w-32 flex gap-2 justify-center items-center'>
            <EmailShareButton url={postUrl}>
                <EmailIcon size={28} round={true} />
            </EmailShareButton>
            <LinkedinShareButton url={linkedinUrl}>
                <LinkedinIcon size={28} round={true}></LinkedinIcon>
            </LinkedinShareButton>
        </div>
    );
};

export default SharePost;