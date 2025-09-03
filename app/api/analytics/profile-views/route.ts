import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { ProfileViewStats } from '../../../types';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

/**
 * Get profile view statistics
 * This endpoint retrieves view counts and timestamps for a profile
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Get total views
    const totalViews = await redis.get<number>(`profile:views:${username}:total`) || 0;
    
    // Get last viewed timestamp
    const lastViewedAt = await redis.get<string>(`profile:views:${username}:last`) || new Date().toISOString();
    
    // Get daily views for the last 7 days
    const viewsByDay: Record<string, number> = {};
    const now = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      const dailyViews = await redis.get<number>(`profile:views:${username}:daily:${dateKey}`) || 0;
      viewsByDay[dateKey] = dailyViews;
    }

    const stats: ProfileViewStats = {
      totalViews,
      lastViewedAt,
      viewsByDay,
    };

    return NextResponse.json({ stats });
  } catch (error: any) {
    console.error('Error fetching profile views:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch profile views' },
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
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

