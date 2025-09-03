'use client';

import { useState, useEffect } from 'react';
import { ViewCounterProps, ProfileViewStats } from '../types';

export default function ViewCounter({ username }: ViewCounterProps) {
  const [viewStats, setViewStats] = useState<ProfileViewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchViewStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/analytics/profile-views?username=${username}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch view statistics');
        }
        
        const data = await response.json();
        setViewStats(data.stats);
      } catch (err) {
        console.error('Error fetching view stats:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchViewStats();
    }
  }, [username]);

  // Record a view
  useEffect(() => {
    const recordView = async () => {
      try {
        await fetch('/api/analytics/record-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });
      } catch (err) {
        console.error('Error recording view:', err);
      }
    };

    if (username) {
      recordView();
    }
  }, [username]);

  if (loading) {
    return <span className="text-sm text-gray-400">Loading view stats...</span>;
  }

  if (error) {
    return null; // Don't show errors to users
  }

  if (!viewStats) {
    return <span className="text-sm text-gray-400">No views yet</span>;
  }

  return (
    <div className="text-sm text-gray-600">
      <span>{viewStats.totalViews} profile {viewStats.totalViews === 1 ? 'view' : 'views'}</span>
    </div>
  );
}

