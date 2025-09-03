import { NextRequest, NextResponse } from 'next/server';
import { getFrameMessage, FrameRequest } from '@coinbase/onchainkit/frame';
import { Redis } from '@upstash/redis';

// Initialize Redis client for analytics
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

/**
 * Handle POST requests for Farcaster Frame interactions
 * This endpoint processes frame actions and returns appropriate responses
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse the frame message from the request
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body, {
      neynarApiKey: process.env.NEYNAR_API_KEY,
    });

    // Validate the frame message
    if (!isValid || !message) {
      return NextResponse.json(
        { error: 'Invalid frame message' },
        { status: 400 }
      );
    }

    // Extract user information from the message
    const { fid, buttonIndex } = message;

    // Get user information from Farcaster
    const userResponse = await fetch(
      `https://api.neynar.com/v2/farcaster/user?fid=${fid}`,
      {
        headers: {
          api_key: process.env.NEYNAR_API_KEY || '',
        },
      }
    );

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      );
    }

    const userData = await userResponse.json();
    const user = userData.user;

    // Record interaction for analytics
    await redis.incr(`profile:view:${user.username}`);

    // Generate profile URL
    const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://b736baa6-c17b-4667-911c-1526746a7017.vistara.dev'}/u/${user.username}`;

    // Handle different button actions
    switch (buttonIndex) {
      case 1: // View Profile
        return NextResponse.json({
          image: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://b736baa6-c17b-4667-911c-1526746a7017.vistara.dev'}/api/og?username=${user.username}`,
          post: {
            text: `Check out my profile on ProfileLinkr: ${profileUrl}`,
          },
        });
      case 2: // Share Profile
        return NextResponse.json({
          image: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://b736baa6-c17b-4667-911c-1526746a7017.vistara.dev'}/api/og?username=${user.username}&shared=true`,
          post: {
            text: `Check out ${user.display_name}'s profile on ProfileLinkr: ${profileUrl}`,
          },
        });
      default:
        return NextResponse.json({
          image: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://b736baa6-c17b-4667-911c-1526746a7017.vistara.dev'}/api/og?username=${user.username}`,
        });
    }
  } catch (error) {
    console.error('Frame error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Handle GET requests for Farcaster Frame metadata
 * This endpoint returns the initial frame content
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const username = searchParams.get('username');

  // Default frame content
  const frameContent = {
    image: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://b736baa6-c17b-4667-911c-1526746a7017.vistara.dev'}/hero.png`,
    buttons: [
      {
        label: 'View My Profile',
      },
      {
        label: 'Share Profile',
      },
    ],
    post_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://b736baa6-c17b-4667-911c-1526746a7017.vistara.dev'}/api/frame`,
  };

  // If username is provided, customize the frame
  if (username) {
    try {
      const userResponse = await fetch(
        `https://api.neynar.com/v2/farcaster/user-by-username?username=${username}`,
        {
          headers: {
            api_key: process.env.NEYNAR_API_KEY || '',
          },
        }
      );

      if (userResponse.ok) {
        const userData = await userResponse.json();
        if (userData.user) {
          frameContent.image = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://b736baa6-c17b-4667-911c-1526746a7017.vistara.dev'}/api/og?username=${username}`;
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  return NextResponse.json(frameContent);
}

