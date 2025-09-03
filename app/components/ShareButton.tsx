'use client';

import { useState } from 'react';

interface ShareButtonProps {
  link: string;
}

export default function ShareButton({ link }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-200"
    >
      {copied ? 'Copied!' : 'Share Profile'}
    </button>
  );
}
