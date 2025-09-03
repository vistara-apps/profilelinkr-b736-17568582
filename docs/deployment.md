# ProfileLinkr Deployment Guide

This guide provides instructions for deploying the ProfileLinkr application to various environments.

## Deployment Options

ProfileLinkr can be deployed to various platforms, including:

1. [Vercel](#vercel-deployment) (Recommended)
2. [Netlify](#netlify-deployment)
3. [Self-hosted](#self-hosted-deployment)

## Prerequisites

Before deploying, ensure you have:

1. A GitHub repository with your ProfileLinkr code
2. API keys for all required services:
   - Neynar API key for Farcaster integration
   - Upstash Redis credentials for analytics
   - OnchainKit API key for wallet connection
3. A domain name (optional but recommended)

## Vercel Deployment

### Step 1: Push Your Code to GitHub

Ensure your code is pushed to a GitHub repository.

### Step 2: Import Your Repository in Vercel

1. Log in to [Vercel](https://vercel.com/)
2. Click "Add New" > "Project"
3. Select your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `next build`
   - Output Directory: .next

### Step 3: Configure Environment Variables

Add the following environment variables in the Vercel project settings:

```
NEYNAR_API_KEY=your_neynar_api_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
NEXT_PUBLIC_BASE_URL=https://your-vercel-url.vercel.app
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
```

### Step 4: Deploy

Click "Deploy" and wait for the deployment to complete.

### Step 5: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click on "Domains"
3. Add your custom domain
4. Follow the instructions to configure DNS settings

## Netlify Deployment

### Step 1: Push Your Code to GitHub

Ensure your code is pushed to a GitHub repository.

### Step 2: Import Your Repository in Netlify

1. Log in to [Netlify](https://netlify.com/)
2. Click "Add new site" > "Import an existing project"
3. Select your GitHub repository
4. Configure the build settings:
   - Build Command: `next build`
   - Publish Directory: .next

### Step 3: Configure Environment Variables

Add the environment variables in the Netlify site settings:

1. Go to Site settings > Build & deploy > Environment
2. Add the same environment variables as listed in the Vercel deployment section

### Step 4: Deploy

Click "Deploy site" and wait for the deployment to complete.

## Self-hosted Deployment

### Step 1: Build the Application

```bash
# Install dependencies
npm install

# Build the application
npm run build
```

### Step 2: Configure Environment Variables

Create a `.env` file with the required environment variables:

```
NEYNAR_API_KEY=your_neynar_api_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
```

### Step 3: Start the Server

```bash
npm run start
```

### Step 4: Configure Reverse Proxy (Optional)

For production deployments, it's recommended to use a reverse proxy like Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Docker Deployment

### Step 1: Create a Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
```

### Step 2: Build and Run the Docker Image

```bash
# Build the Docker image
docker build -t profilelinkr .

# Run the Docker container
docker run -p 3000:3000 --env-file .env profilelinkr
```

## Continuous Deployment

### GitHub Actions

You can set up continuous deployment using GitHub Actions:

1. Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

2. Add the required secrets in your GitHub repository settings

## Post-Deployment Checklist

After deploying, verify the following:

1. The application loads correctly
2. Wallet connection works
3. Farcaster profile data is fetched correctly
4. Profile sharing functionality works
5. Analytics data is being recorded
6. Frame interactions work correctly

## Troubleshooting

### Common Deployment Issues

1. **Environment Variables**: Ensure all environment variables are correctly set
2. **API Rate Limits**: Check if you're hitting rate limits on the Neynar API
3. **CORS Issues**: Ensure CORS is properly configured for API requests
4. **Build Errors**: Check the build logs for any errors

### Getting Help

If you encounter issues during deployment, check:

1. The [Next.js deployment documentation](https://nextjs.org/docs/deployment)
2. The [Vercel documentation](https://vercel.com/docs) or [Netlify documentation](https://docs.netlify.com/)
3. The [GitHub Issues](https://github.com/vistara-apps/profilelinkr-b736-17568582/issues) for existing problems and solutions

