# ProfileLinkr Components

This document provides documentation for the key components in the ProfileLinkr application.

## Table of Contents

1. [Page Components](#page-components)
2. [Feature Components](#feature-components)
3. [UI Components](#ui-components)
4. [API Components](#api-components)

## Page Components

### Home Page (`app/page.tsx`)

The main entry point of the application. It handles:
- Wallet connection
- Fetching user data from Farcaster
- Displaying the user's profile

**Props**: None

**State**:
- `isClient`: Boolean to handle hydration issues
- Query state from React Query for user data

**Example**:
```tsx
// The component is rendered at the root route
<Home />
```

### Profile Page (`app/u/[username]/page.tsx`)

Displays a user's profile based on their username. It handles:
- Fetching user data from Farcaster by username
- Displaying the user's profile
- Recording profile views
- Generating metadata for social sharing

**Props**:
- `params`: Object containing the username parameter

**Example**:
```tsx
// The component is rendered at the /u/[username] route
<ProfilePage params={{ username: 'johndoe' }} />
```

## Feature Components

### ProfileCard (`app/components/ProfileCard.tsx`)

Displays a user's profile information in a card format.

**Props**:
- `user`: User object containing profile data
- `showShare`: Boolean to control whether to show the share button
- `viewStats`: Optional view statistics for the profile

**Example**:
```tsx
<ProfileCard 
  user={user} 
  showShare={true} 
  viewStats={viewStats} 
/>
```

### ProfileHeader (`app/components/ProfileHeader.tsx`)

Displays a user's profile header with their name, username, and profile picture.

**Props**:
- `displayName`: User's display name
- `username`: User's username
- `profilePictureUrl`: URL of the user's profile picture

**Example**:
```tsx
<ProfileHeader 
  displayName="John Doe" 
  username="johndoe" 
  profilePictureUrl="https://example.com/profile.jpg" 
/>
```

### SocialLink (`app/components/SocialLink.tsx`)

Displays a link to a user's social profile.

**Props**:
- `variant`: Social platform variant (default: 'farcaster')
- `username`: User's username on the platform

**Example**:
```tsx
<SocialLink username="johndoe" variant="farcaster" />
```

### ShareButton (`app/components/ShareButton.tsx`)

Button for sharing a user's profile.

**Props**:
- `link`: URL to share

**Example**:
```tsx
<ShareButton link="https://example.com/u/johndoe" />
```

### ViewCounter (`app/components/ViewCounter.tsx`)

Displays the number of views for a user's profile.

**Props**:
- `username`: User's username

**Example**:
```tsx
<ViewCounter username="johndoe" />
```

### FrameMetadata (`app/components/FrameMetadata.tsx`)

Generates metadata for Farcaster Frames.

**Props**:
- `title`: Page title
- `description`: Page description
- `image`: Image URL
- `baseUrl`: Base URL of the application
- `username`: Optional username for customization

**Example**:
```tsx
<FrameMetadata 
  title="John Doe's Profile" 
  description="View John Doe's profile on ProfileLinkr" 
  image="https://example.com/og-image.png" 
  baseUrl="https://example.com" 
  username="johndoe" 
/>
```

## UI Components

### Button (`app/components/ui/Button.tsx`)

Reusable button component with different variants and sizes.

**Props**:
- `variant`: Button variant ('primary', 'secondary', 'outline')
- `size`: Button size ('sm', 'md', 'lg')
- `fullWidth`: Whether the button should take full width
- `isLoading`: Whether to show a loading state
- All standard button props

**Example**:
```tsx
<Button 
  variant="primary" 
  size="md" 
  onClick={handleClick} 
  isLoading={isLoading}
>
  Click Me
</Button>
```

### Card (`app/components/ui/Card.tsx`)

Reusable card component with different variants.

**Props**:
- `variant`: Card variant ('default', 'outline', 'elevated')
- All standard div props

**Example**:
```tsx
<Card variant="elevated" className="p-4">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
  <CardFooter>
    Card footer
  </CardFooter>
</Card>
```

### ErrorBoundary (`app/components/ErrorBoundary.tsx`)

Component for catching and handling errors in the component tree.

**Props**:
- `children`: React nodes to render
- `fallback`: React node to render when an error occurs

**Example**:
```tsx
<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <ComponentThatMightError />
</ErrorBoundary>
```

### LoadingState (`app/components/LoadingState.tsx`)

Component for displaying loading states.

**Props**:
- `message`: Optional loading message
- `size`: Size of the loading indicator ('small', 'medium', 'large')

**Example**:
```tsx
<LoadingState message="Loading profile..." size="large" />
```

## API Components

### OpenGraph Image (`app/api/og/route.tsx`)

Generates dynamic OpenGraph images for profiles.

**Query Parameters**:
- `username`: Optional Farcaster username
- `shared`: Optional boolean indicating if the image is for a shared profile

**Example**:
```
GET /api/og?username=johndoe&shared=true
```

### Frame API (`app/api/frame/route.ts`)

Handles Farcaster Frame interactions.

**POST Request Body**:
- Farcaster Frame message format

**GET Query Parameters**:
- `username`: Optional Farcaster username to customize the frame

**Example**:
```
GET /api/frame?username=johndoe
POST /api/frame
```

### Analytics API (`app/api/analytics/record-view/route.ts`)

Records a view of a user's profile.

**POST Request Body**:
```json
{
  "username": "johndoe"
}
```

**Example**:
```
POST /api/analytics/record-view
```

### Profile Views API (`app/api/analytics/profile-views/route.ts`)

Retrieves view statistics for a user's profile.

**Query Parameters**:
- `username`: Farcaster username

**Example**:
```
GET /api/analytics/profile-views?username=johndoe
```

