import { ProfileHeaderProps } from '../types';

export default function ProfileHeader({ displayName, username, profilePictureUrl }: ProfileHeaderProps) {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-md items-center">
      <img
        src={profilePictureUrl}
        alt={displayName}
        className="w-20 h-20 rounded-lg object-cover"
        loading="lazy"
      />
      <div>
        <h2 className="text-2xl font-bold text-primary">{displayName}</h2>
        <p className="text-accent">@{username}</p>
      </div>
    </div>
  );
}
