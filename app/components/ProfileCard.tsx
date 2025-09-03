'use client';

import { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import SocialLink from './SocialLink';
import ShareButton from './ShareButton';
import ViewCounter from './ViewCounter';
import Card, { CardHeader, CardContent, CardFooter } from './ui/Card';
import { ProfileCardProps } from '../types';

export default function ProfileCard({ user, showShare, viewStats }: ProfileCardProps) {
  const [shareLink, setShareLink] = useState('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareLink(`${window.location.origin}/u/${user.username}`);
    }
  }, [user.username]);

  return (
    <Card variant="elevated" className="max-w-sm mx-auto w-full">
      <CardHeader>
        <ProfileHeader
          displayName={user.display_name}
          username={user.username}
          profilePictureUrl={user.profile.picture.url}
        />
      </CardHeader>
      
      <CardContent>
        <p className="text-base leading-6">{user.profile.bio.text || 'No bio provided'}</p>
        
        <div className="mt-md flex flex-col gap-md">
          <SocialLink username={user.username} />
          
          {viewStats && (
            <div className="text-sm text-gray-600">
              <ViewCounter username={user.username} />
            </div>
          )}
        </div>
      </CardContent>
      
      {showShare && (
        <CardFooter>
          <ShareButton link={shareLink} />
        </CardFooter>
      )}
    </Card>
  );
}
