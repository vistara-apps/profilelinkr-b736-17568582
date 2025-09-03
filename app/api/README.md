# ProfileLinkr API

This directory contains all API endpoints for the ProfileLinkr application.

## Directory Structure

- `/api/farcaster/user-by-verification`: Fetches Farcaster user data by Ethereum address
- `/api/frame`: Handles Farcaster Frame interactions
- `/api/analytics/record-view`: Records profile views for analytics
- `/api/analytics/profile-views`: Retrieves profile view statistics
- `/api/og`: Generates dynamic OpenGraph images for profiles

## Implementation Details

### Farcaster Integration

The Farcaster integration uses the Neynar API to fetch user data and handle frame interactions. The API key is stored in the `NEYNAR_API_KEY` environment variable.

### Analytics

Analytics data is stored in Upstash Redis. The Redis connection details are stored in the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` environment variables.

### OpenGraph Images

OpenGraph images are generated using the Next.js Edge Runtime and the `ImageResponse` API. This allows for dynamic image generation without a separate image processing service.

## Error Handling

All API endpoints follow a consistent error handling pattern:

```typescript
try {
  // API logic
  return NextResponse.json(data);
} catch (error: any) {
  return NextResponse.json({ error: error.message }, { status: 500 });
}
```

## Adding New Endpoints

When adding new endpoints, follow these guidelines:

1. Create a new directory under `/api` for the endpoint category
2. Create a `route.ts` file with the appropriate HTTP methods
3. Add proper error handling
4. Update the API documentation in `/docs/api.md`

## Testing

API endpoints can be tested using tools like Postman or curl. For example:

```bash
curl -X GET "http://localhost:3000/api/farcaster/user-by-verification?address=0x1234567890abcdef"
```

For more detailed API documentation, see the [API Documentation](/docs/api.md).

