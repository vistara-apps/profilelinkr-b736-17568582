import Head from 'next/head';

interface SocialPreviewMetaProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  username?: string;
}

/**
 * Component for adding social media preview metadata to pages
 * 
 * @param props - Component props
 * @returns Social preview metadata component
 */
export default function SocialPreviewMeta({
  title,
  description,
  imageUrl,
  url,
  username,
}: SocialPreviewMetaProps) {
  // Format title with username if provided
  const formattedTitle = username ? `${title} (@${username})` : title;
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="title" content={formattedTitle} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={formattedTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      
      {/* Farcaster */}
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content={imageUrl} />
      <meta property="fc:frame:button:1" content="View Profile" />
      <meta property="fc:frame:button:2" content="Share Profile" />
      <meta property="fc:frame:post_url" content={`${url}/api/frame${username ? `?username=${username}` : ''}`} />
    </Head>
  );
}

