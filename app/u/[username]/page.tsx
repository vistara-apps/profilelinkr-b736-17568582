import { Metadata } from 'next';
import ProfileCard from '../../components/ProfileCard';
import { generateFrameMetadata } from '../../components/FrameMetadata';
import { User, ProfileViewStats } from '../../types';

// Generate metadata for the page including frame metadata
export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const { username } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://b736baa6-c17b-4667-911c-1526746a7017.vistara.dev';
  
  // Try to get user data for custom metadata
  try {
    const data = await getUser(username);
    const user = data?.user;
    
    if (user) {
      return generateFrameMetadata({
        title: `${user.display_name} (@${user.username}) | ProfileLinkr`,
        description: user.profile.bio.text || 'View and share my digital identity on ProfileLinkr',
        image: `${baseUrl}/api/og?username=${username}`,
        baseUrl,
        username,
      });
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  // Fallback metadata
  return generateFrameMetadata({
    title: 'ProfileLinkr | Your Digital Identity, Instantly Sharable',
    description: 'View and share your digital identity on ProfileLinkr',
    image: `${baseUrl}/hero.png`,
    baseUrl,
  });
}

/**
 * Fetch user data from Farcaster API
 * 
 * @param username - Farcaster username
 * @returns User data or null if not found
 */
async function getUser(username: string): Promise<{ user: User } | null> {
  try {
    const res = await fetch(`https://api.neynar.com/v2/farcaster/user-by-username?username=${username}`, {
      headers: {
        api_key: process.env.NEYNAR_API_KEY || '',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

/**
 * Fetch profile view statistics
 * 
 * @param username - Farcaster username
 * @returns View statistics or null if not available
 */
async function getProfileViewStats(username: string): Promise<ProfileViewStats | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://b736baa6-c17b-4667-911c-1526746a7017.vistara.dev';
    const res = await fetch(`${baseUrl}/api/analytics/profile-views?username=${username}`, {
      next: { revalidate: 60 }, // Cache for 1 minute
    });
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.stats;
  } catch (error) {
    console.error('Error fetching view stats:', error);
    return null;
  }
}

/**
 * Profile page component
 * Displays a user's profile based on their username
 */
export default async function ProfilePage({ params }: { params: { username: string } }) {
  const { username } = params;
  const data = await getUser(username);
  const user = data?.user;
  const viewStats = await getProfileViewStats(username);

  // Record a view
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://b736baa6-c17b-4667-911c-1526746a7017.vistara.dev';
    await fetch(`${baseUrl}/api/analytics/record-view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
  } catch (error) {
    console.error('Error recording view:', error);
  }

  // Handle user not found
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-4">
        <div className="max-w-sm mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Profile Not Found</h2>
            <p className="text-red-600">
              The profile you're looking for doesn't exist or has been removed.
            </p>
          </div>
          <div className="mt-4">
            <a 
              href="/" 
              className="text-accent hover:underline"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Render profile
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-4">
      <div className="max-w-sm mx-auto w-full">
        <ProfileCard user={user} showShare={true} viewStats={viewStats} />
      </div>
    </div>
  );
}
