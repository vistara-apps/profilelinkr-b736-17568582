'use client';

import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useState, useEffect } from 'react';
import ProfileCard from './components/ProfileCard';
import LoadingState from './components/LoadingState';
import ErrorBoundary from './components/ErrorBoundary';
import { User } from './types';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [isClient, setIsClient] = useState(false);

  // This ensures hydration issues are avoided
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: user, error, isLoading } = useQuery<User>({
    queryKey: ['farcasterUser', address],
    queryFn: async () => {
      if (!address) throw new Error('No address');
      
      try {
        const res = await fetch(`/api/farcaster/user-by-verification?address=${address}`);
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch user');
        }
        
        const data = await res.json();
        
        if (!data.user) {
          throw new Error('No Farcaster profile found');
        }
        
        return data.user;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },
    enabled: !!isConnected && !!address && isClient,
    retry: 1, // Only retry once to avoid excessive API calls
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Handle wallet connection state
  if (!isClient || !isConnected) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-4">
        <div className="max-w-sm mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4 text-primary">ProfileLinkr</h1>
          <p className="mb-6">Your Digital Identity, Instantly Sharable.</p>
          <p className="mb-6">Connect your wallet to view and share your profile.</p>
          <ConnectWallet />
        </div>
      </div>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <LoadingState message="Loading your profile..." size="large" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-4">
        <div className="max-w-sm mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold text-red-700 mb-2">
              {error.message === 'No Farcaster profile found' ? 'No Farcaster Profile Found' : 'Error'}
            </h2>
            <p className="text-red-600">
              {error.message === 'No Farcaster profile found'
                ? 'No Farcaster profile is linked to this wallet address. Please verify your address on Farcaster and try again.'
                : `Error fetching profile: ${error.message}`}
            </p>
          </div>
          <div className="mt-4">
            <a 
              href="https://warpcast.com/~/settings/verify-wallet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Verify your wallet on Farcaster
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Render profile
  return (
    <ErrorBoundary fallback={
      <div className="flex min-h-screen items-center justify-center bg-bg p-4">
        <div className="max-w-sm mx-auto text-center text-red-500">
          Something went wrong while displaying your profile. Please try again later.
        </div>
      </div>
    }>
      <div className="flex min-h-screen items-center justify-center bg-bg p-4">
        <div className="max-w-sm mx-auto w-full">
          <ProfileCard user={user} showShare={true} />
        </div>
      </div>
    </ErrorBoundary>
  );
}
