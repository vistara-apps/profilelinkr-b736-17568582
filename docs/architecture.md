# ProfileLinkr Architecture

This document provides an overview of the ProfileLinkr application architecture, including its components, data flow, and design decisions.

## System Overview

ProfileLinkr is a Next.js application that integrates with Farcaster to display and share user profiles. The application follows a client-server architecture with the following key components:

1. **Frontend**: React components built with Next.js and styled with Tailwind CSS
2. **API Layer**: Next.js API routes for handling data fetching and processing
3. **External Integrations**: Farcaster (via Neynar API), Wallet connection (via OnchainKit)
4. **Data Storage**: Upstash Redis for analytics data

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Browser                         │
└───────────────────────────────┬─────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                       Next.js App                           │
│                                                             │
│  ┌─────────────────┐    ┌──────────────┐    ┌────────────┐  │
│  │  React Components│    │  API Routes   │    │  Middleware │  │
│  └────────┬────────┘    └───────┬──────┘    └─────┬──────┘  │
│           │                     │                  │         │
└───────────┼─────────────────────┼──────────────────┼─────────┘
            │                     │                  │
            ▼                     ▼                  ▼
┌───────────────────┐  ┌────────────────┐  ┌──────────────────┐
│  Wallet Connection │  │  Farcaster API  │  │  Redis Analytics  │
│    (OnchainKit)    │  │    (Neynar)     │  │    (Upstash)     │
└───────────────────┘  └────────────────┘  └──────────────────┘
```

## Component Architecture

### Frontend Components

The frontend is organized into reusable components following a component-based architecture:

- **Page Components**: Top-level components that represent pages (e.g., `app/page.tsx`, `app/u/[username]/page.tsx`)
- **Feature Components**: Components that implement specific features (e.g., `ProfileCard`, `ShareButton`)
- **UI Components**: Reusable UI elements (e.g., `Button`, `Card`)
- **Layout Components**: Components that define the layout structure (e.g., `app/layout.tsx`)

### API Routes

The API layer is organized by feature domain:

- **Farcaster Integration**: `/api/farcaster/*` - Endpoints for interacting with Farcaster
- **Frame Endpoints**: `/api/frame` - Endpoints for Farcaster Frames
- **Analytics**: `/api/analytics/*` - Endpoints for tracking and retrieving analytics data
- **OpenGraph**: `/api/og` - Endpoint for generating dynamic OpenGraph images

### Data Flow

1. **User Authentication**:
   - User connects their wallet using OnchainKit
   - The app fetches the user's Farcaster profile using the Neynar API

2. **Profile Display**:
   - The app fetches the user's profile data from Farcaster
   - The data is displayed using the ProfileCard component

3. **Profile Sharing**:
   - User clicks the Share button
   - The app generates a shareable link to the user's profile
   - The link can be copied or shared directly to social platforms

4. **Analytics**:
   - Profile views are recorded in Upstash Redis
   - View statistics are displayed to the profile owner

## Design Decisions

### Next.js App Router

We chose Next.js App Router for its:
- Server-side rendering capabilities
- API routes for backend functionality
- Edge runtime for dynamic image generation
- Simplified routing with file-based routing

### Tailwind CSS

We chose Tailwind CSS for:
- Rapid UI development
- Consistent design system implementation
- Small bundle size with utility-first approach

### Farcaster Integration via Neynar

We chose Neynar API for Farcaster integration because:
- It provides a simple REST API for accessing Farcaster data
- It handles authentication and rate limiting
- It's well-documented and maintained

### Upstash Redis for Analytics

We chose Upstash Redis for:
- Serverless architecture compatibility
- Simple key-value storage for analytics data
- Low latency for read/write operations

### OnchainKit for Wallet Connection

We chose OnchainKit for:
- Simplified wallet connection flow
- Base ecosystem integration
- Support for multiple wallet providers

## Security Considerations

- **API Keys**: All API keys are stored as environment variables and not exposed to the client
- **Data Validation**: All user inputs are validated before processing
- **Error Handling**: Comprehensive error handling to prevent exposing sensitive information

## Performance Considerations

- **Caching**: API responses are cached to reduce API calls
- **Image Optimization**: Images are optimized for performance
- **Code Splitting**: Components are code-split for faster loading
- **Edge Runtime**: Dynamic image generation uses Edge runtime for better performance

## Future Improvements

- **Multi-platform Integration**: Add support for more social platforms beyond Farcaster
- **Enhanced Analytics**: Add more detailed analytics and visualizations
- **Custom Themes**: Allow users to customize their profile appearance
- **Verification Badges**: Add support for verification badges and credentials

