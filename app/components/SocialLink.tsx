import { SocialLinkProps } from '../types';

export default function SocialLink({ variant = 'farcaster', username }: SocialLinkProps) {
  if (variant !== 'farcaster') return null;

  return (
    <a
      href={`https://warpcast.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:underline flex items-center gap-2"
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
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
      View on Farcaster
    </a>
  );
}
