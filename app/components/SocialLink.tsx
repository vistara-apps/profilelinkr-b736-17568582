interface SocialLinkProps {
  variant?: 'farcaster';
  username: string;
}

export default function SocialLink({ variant = 'farcaster', username }: SocialLinkProps) {
  if (variant !== 'farcaster') return null;

  return (
    <a
      href={`https://warpcast.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:underline"
    >
      View on Farcaster
    </a>
  );
}
