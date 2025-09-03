# ProfileLinkr

ProfileLinkr is a Base mini-app that allows users to instantly view and share their digital identity, pulling data from key social platforms like Farcaster.

![ProfileLinkr](https://b736baa6-c17b-4667-911c-1526746a7017.vistara.dev/hero.png)

## Features

- **Instant Profile Viewer**: Generate a unique, shareable link that displays your name, profile picture, and username from your Farcaster profile.
- **Farcaster Integration**: Connect to Farcaster via Neynar API to retrieve and display your core profile data.
- **Simple Contact Card**: Present a universally accessible mini-app link containing your main profile details and a link to your Farcaster profile.
- **Analytics**: Track profile views and engagement.
- **Frame Support**: Full support for Farcaster Frames, allowing for rich interactions within the Farcaster ecosystem.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Authentication**: Privy, Wagmi, OnchainKit
- **API Integration**: Neynar API (Farcaster)
- **Analytics**: Upstash Redis
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Neynar API key for Farcaster integration
- Upstash Redis account for analytics
- Privy account for wallet authentication

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vistara-apps/profilelinkr-b736-17568582.git
   cd profilelinkr-b736-17568582
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   NEYNAR_API_KEY=your_neynar_api_key
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   NEXT_PUBLIC_BASE_URL=your_app_url
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
profilelinkr/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   │   ├── analytics/    # Analytics endpoints
│   │   ├── farcaster/    # Farcaster integration endpoints
│   │   ├── frame/        # Farcaster Frame endpoints
│   │   └── og/           # OpenGraph image generation
│   ├── components/       # React components
│   │   ├── ui/           # UI components
│   │   └── ...           # Feature components
│   ├── types/            # TypeScript type definitions
│   ├── u/                # User profile pages
│   └── ...               # Other app files
├── docs/                 # Documentation
├── public/               # Static assets
└── scripts/              # Utility scripts
```

## API Documentation

See the [API Documentation](./docs/api.md) for details on available endpoints.

## Deployment

The app is deployed on Vercel and can be accessed at [https://b736baa6-c17b-4667-911c-1526746a7017.vistara.dev](https://b736baa6-c17b-4667-911c-1526746a7017.vistara.dev).

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Farcaster](https://farcaster.xyz/) for the social graph API
- [Neynar](https://neynar.com/) for the Farcaster API
- [Base](https://base.org/) for the mini-app platform
- [OnchainKit](https://onchainkit.xyz/) for wallet integration
- [Upstash](https://upstash.com/) for serverless Redis

