import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

/**
 * Record a profile view
 * This endpoint increments view counters and stores view timestamps
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const now = new Date();
    const dateKey = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Use a Redis transaction to update multiple keys atomically
    const pipeline = redis.pipeline();
    
    // Increment total views counter
    pipeline.incr(`profile:views:${username}:total`);
    
    // Increment daily views counter
    pipeline.incr(`profile:views:${username}:daily:${dateKey}`);
    
    // Set last viewed timestamp
    pipeline.set(`profile:views:${username}:last`, now.toISOString());
    
    // Execute all commands
    await pipeline.exec();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error recording view:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to record view' },
      { status: 500 }
    );
  }
}

/**
 * Handle OPTIONS requests for CORS
 */
export async function OPTIONS(): Promise<NextResponse> {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

