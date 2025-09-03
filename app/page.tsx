'use client';

import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import ProfileCard from './components/ProfileCard';

export default function Home() {
  const { address, isConnected } = useAccount();

  const { data: user, error, isLoading } = useQuery({
    queryKey: ['farcasterUser', address],
    queryFn: async () => {
      if (!address) throw new Error('No address');
      const res = await fetch(`/api/farcaster/user-by-verification?address=${address}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch user');
      }
      const data = await res.json();
      if (!data.user) throw new Error('No Farcaster profile found');
      return data.user;
    },
    enabled: !!isConnected && !!address,
  });

  if (!isConnected) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-4">
        <div className="max-w-sm mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">ProfileLinkr</h1>
          <p className="mb-6">Connect your wallet to view and share your profile.</p>
          <ConnectWallet />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-bg">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-4">
        <div className="max-w-sm mx-auto text-center text-red-500">
          {error.message === 'No Farcaster profile found'
            ? 'No Farcaster profile linked to this address. Please verify your address on Farcaster.'
            : 'Error fetching profile: ' + error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-4">
      <div className="max-w-sm mx-auto w-full">
        <ProfileCard user={user} showShare={true} />
      </div>
    </div>
  );
}
