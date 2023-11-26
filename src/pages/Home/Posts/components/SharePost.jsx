import React from 'react';
import {
    EmailIcon,
    EmailShareButton,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    LinkedinIcon,
    LinkedinShareButton,
} from 'react-share';

const SharePost = () => {

    const postUrl = 'https://www.npmjs.com/package/react-loading'; 
    const linkedinUrl = 'https://www.linkedin.com/'; 
    const messengerURL = 'https://www.facebook.com/'; 
    

    return (
        <div className='flex gap-2 justify-center items-center'>
            <LinkedinShareButton url={linkedinUrl}>
                <LinkedinIcon size={28} round={true}></LinkedinIcon>
            </LinkedinShareButton>
            <FacebookMessengerShareButton url={messengerURL}>
                <FacebookMessengerIcon size={28} round={true}></FacebookMessengerIcon>
            </FacebookMessengerShareButton>
        </div>
    );
};

export default SharePost;