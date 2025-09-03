# ProfileLinkr Setup Guide

This guide provides detailed instructions for setting up the ProfileLinkr application for development and production.

## Development Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- Git
- A code editor (VS Code recommended)
- Neynar API key for Farcaster integration
- Upstash Redis account for analytics
- Privy account for wallet authentication

### Step 1: Clone the Repository

```bash
git clone https://github.com/vistara-apps/profilelinkr-b736-17568582.git
cd profilelinkr-b736-17568582
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Farcaster API (Neynar)
NEYNAR_API_KEY=your_neynar_api_key

# Upstash Redis (for analytics)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# App URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# OnchainKit (for wallet connection)
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
```

### Step 4: Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Step 5: Testing

```bash
npm run test
# or
yarn test
```

## Production Deployment

### Option 1: Vercel Deployment

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy

### Option 2: Manual Deployment

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm run start
   # or
   yarn start
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEYNAR_API_KEY` | API key for Neynar (Farcaster API) | Yes |
| `UPSTASH_REDIS_REST_URL` | URL for Upstash Redis | Yes |
| `UPSTASH_REDIS_REST_TOKEN` | Token for Upstash Redis | Yes |
| `NEXT_PUBLIC_BASE_URL` | Base URL for the application | Yes |
| `NEXT_PUBLIC_ONCHAINKIT_API_KEY` | API key for OnchainKit | Yes |

## Obtaining API Keys

### Neynar API Key

1. Sign up at [Neynar](https://neynar.com/)
2. Create a new application
3. Copy the API key

### Upstash Redis

1. Sign up at [Upstash](https://upstash.com/)
2. Create a new Redis database
3. Copy the REST URL and REST token

### OnchainKit API Key

1. Sign up at [OnchainKit](https://onchainkit.xyz/)
2. Create a new application
3. Copy the API key

## Troubleshooting

### Common Issues

1. **API Key Issues**: Ensure all API keys are correctly set in the environment variables.
2. **Redis Connection**: Verify that the Upstash Redis URL and token are correct.
3. **Wallet Connection**: Make sure the OnchainKit API key is correctly set.

### Getting Help

If you encounter any issues, please:

1. Check the [GitHub Issues](https://github.com/vistara-apps/profilelinkr-b736-17568582/issues) for existing problems and solutions
2. Create a new issue if your problem is not already reported

