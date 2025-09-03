# ProfileLinkr API Documentation

This document provides comprehensive documentation for the ProfileLinkr API endpoints.

## Table of Contents

1. [Authentication](#authentication)
2. [Farcaster User Endpoints](#farcaster-user-endpoints)
3. [Frame Endpoints](#frame-endpoints)
4. [Analytics Endpoints](#analytics-endpoints)
5. [OpenGraph Image Endpoints](#opengraph-image-endpoints)
6. [Error Handling](#error-handling)

## Authentication

ProfileLinkr uses environment variables for API authentication. The following environment variables are required:

- `NEYNAR_API_KEY`: API key for Neynar (Farcaster API)
- `UPSTASH_REDIS_REST_URL`: URL for Upstash Redis (analytics storage)
- `UPSTASH_REDIS_REST_TOKEN`: Token for Upstash Redis
- `NEXT_PUBLIC_BASE_URL`: Base URL for the application

## Farcaster User Endpoints

### Get User by Verification

Retrieves a Farcaster user by their verified Ethereum address.

**URL**: `/api/farcaster/user-by-verification`

**Method**: `GET`

**Query Parameters**:
- `address` (required): Ethereum address to look up

**Success Response**:
- **Code**: 200
- **Content**:
```json
{
  "user": {
    "fid": 12345,
    "display_name": "User Name",
    "username": "username",
    "profile": {
      "bio": {
        "text": "User bio"
      },
      "picture": {
        "url": "https://example.com/profile.jpg"
      }
    }
  }
}
```

**Error Response**:
- **Code**: 400
  - **Content**: `{ "error": "Address is required" }`
- **Code**: 500
  - **Content**: `{ "error": "Error message" }`

**Example**:
```
GET /api/farcaster/user-by-verification?address=0x1234567890abcdef
```

## Frame Endpoints

### Frame Action Handler

Handles Farcaster Frame actions and returns appropriate responses.

**URL**: `/api/frame`

**Method**: `POST`

**Request Body**:
- Farcaster Frame message format (see [Farcaster Frames documentation](https://docs.farcaster.xyz/reference/frames/spec))

**Success Response**:
- **Code**: 200
- **Content**: Frame response format with image and optional post content

**Error Response**:
- **Code**: 400
  - **Content**: `{ "error": "Invalid frame message" }`
- **Code**: 500
  - **Content**: `{ "error": "Internal server error" }`

### Frame Metadata

Returns initial frame content for Farcaster Frames.

**URL**: `/api/frame`

**Method**: `GET`

**Query Parameters**:
- `username` (optional): Farcaster username to customize the frame

**Success Response**:
- **Code**: 200
- **Content**: Frame metadata format with image and buttons

## Analytics Endpoints

### Record Profile View

Records a view of a user's profile for analytics.

**URL**: `/api/analytics/record-view`

**Method**: `POST`

**Request Body**:
```json
{
  "username": "username"
}
```

**Success Response**:
- **Code**: 200
- **Content**: `{ "success": true }`

**Error Response**:
- **Code**: 400
  - **Content**: `{ "error": "Username is required" }`
- **Code**: 500
  - **Content**: `{ "error": "Error message" }`

### Get Profile Views

Retrieves view statistics for a user's profile.

**URL**: `/api/analytics/profile-views`

**Method**: `GET`

**Query Parameters**:
- `username` (required): Farcaster username

**Success Response**:
- **Code**: 200
- **Content**:
```json
{
  "stats": {
    "totalViews": 42,
    "lastViewedAt": "2023-09-03T12:34:56Z",
    "viewsByDay": {
      "2023-09-03": 10,
      "2023-09-02": 15,
      "2023-09-01": 17
    }
  }
}
```

**Error Response**:
- **Code**: 400
  - **Content**: `{ "error": "Username is required" }`
- **Code**: 500
  - **Content**: `{ "error": "Error message" }`

## OpenGraph Image Endpoints

### Generate OpenGraph Image

Generates dynamic OpenGraph images for profiles.

**URL**: `/api/og`

**Method**: `GET`

**Query Parameters**:
- `username` (optional): Farcaster username
- `shared` (optional): Set to "true" if the image is for a shared profile

**Success Response**:
- **Code**: 200
- **Content**: PNG image

**Error Response**:
- Returns a fallback image with an error message

## Error Handling

All API endpoints follow a consistent error handling pattern:

1. **Client Errors (4xx)**:
   - 400: Bad Request - Missing or invalid parameters
   - 404: Not Found - Resource not found

2. **Server Errors (5xx)**:
   - 500: Internal Server Error - Unexpected server error

Error responses have the following format:
```json
{
  "error": "Error message"
}
```

