// components/blog/SocialShare.js
import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

const SocialShare = ({ url, title }) => {
  return (
    <div className="flex space-x-4 mt-8">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={40} round />
      </LinkedinShareButton>
      
    </div>
  );
};

export default SocialShare;
