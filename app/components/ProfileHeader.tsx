interface ProfileHeaderProps {
  displayName: string;
  username: string;
  profilePictureUrl: string;
}

export default function ProfileHeader({ displayName, username, profilePictureUrl }: ProfileHeaderProps) {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-md items-center">
      <img
        src={profilePictureUrl}
        alt={displayName}
        className="w-20 h-20 rounded-lg object-cover"
      />
      <div>
        <h2 className="text-2xl font-bold">{displayName}</h2>
        <p className="text-primary">@{username}</p>
      </div>
    </div>
  );
}
