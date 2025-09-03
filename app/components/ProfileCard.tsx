    'use client';

    import ProfileHeader from './ProfileHeader';
    import SocialLink from './SocialLink';
    import ShareButton from './ShareButton';

    interface User {
      fid: number;
      display_name: string;
      username: string;
      profile: {
        bio: { text: string };
        picture: { url: string };
      };
    }

    interface ProfileCardProps {
      user: User;
      showShare: boolean;
    }

    export default function ProfileCard({ user, showShare }: ProfileCardProps) {
      const shareLink = typeof window !== 'undefined' ? `${window.location.origin}/u/${user.username}` : '';

      return (
        <div className="bg-surface p-4 rounded-lg shadow-card max-w-sm mx-auto">
          <ProfileHeader
            displayName={user.display_name}
            username={user.username}
            profilePictureUrl={user.profile.picture.url}
          />
          <p className="mt-md text-base">{user.profile.bio.text}</p>
          <div className="mt-md">
            <SocialLink username={user.username} />
          </div>
          {showShare && (
            <div className="mt-md">
              <ShareButton link={shareLink} />
            </div>
          )}
        </div>
      );
    }
  