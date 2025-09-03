/**
 * User entity interface
 * Represents a user profile with Farcaster data
 */
export interface User {
  fid: number;
  username: string;
  display_name: string;
  farcasterUserId: string; // Farcaster FID
  profile: {
    bio: {
      text: string;
    };
    picture: {
      url: string;
    };
  };
}

/**
 * Profile view analytics data
 */
export interface ProfileViewStats {
  totalViews: number;
  lastViewedAt: string;
  viewsByDay: Record<string, number>;
}

/**
 * Frame action types
 */
export enum FrameActionType {
  VIEW_PROFILE = 1,
  SHARE_PROFILE = 2,
}

/**
 * Frame message interface
 */
export interface FrameMessage {
  fid: number;
  buttonIndex: number;
  castId: {
    fid: number;
    hash: string;
  };
  timestamp: number;
}

/**
 * API response interfaces
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UserResponse {
  user: User;
}

export interface ProfileViewResponse {
  stats: ProfileViewStats;
}

/**
 * Component props interfaces
 */
export interface ProfileCardProps {
  user: User;
  showShare: boolean;
  viewStats?: ProfileViewStats;
}

export interface ProfileHeaderProps {
  displayName: string;
  username: string;
  profilePictureUrl: string;
}

export interface SocialLinkProps {
  variant?: 'farcaster';
  username: string;
}

export interface ShareButtonProps {
  link: string;
}

export interface ViewCounterProps {
  username: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

