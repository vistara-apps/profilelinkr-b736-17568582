'use client';

import { useState } from 'react';
import { ShareButtonProps } from '../types';

export default function ShareButton({ link }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my profile on ProfileLinkr',
          text: 'View my digital identity on ProfileLinkr',
          url: link,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fall back to copy if sharing fails
        handleCopy();
      }
    } else {
      // If Web Share API is not available, toggle share menu
      setShareMenuOpen(!shareMenuOpen);
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      'Check out my profile on ProfileLinkr'
    )}&url=${encodeURIComponent(link)}`;
    window.open(twitterUrl, '_blank');
    setShareMenuOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-200 w-full flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        {copied ? 'Copied!' : 'Share Profile'}
      </button>

      {shareMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-10">
          <button
            onClick={handleCopy}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy Link
          </button>
          <button
            onClick={shareToTwitter}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
            Share on Twitter
          </button>
        </div>
      )}
    </div>
  );
}
