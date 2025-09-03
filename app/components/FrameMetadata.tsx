import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import { Metadata } from 'next';

interface FrameMetadataProps {
  title: string;
  description: string;
  image: string;
  baseUrl: string;
  username?: string;
}

/**
 * Generate frame metadata for Farcaster frames
 * 
 * @param props - Frame metadata properties
 * @returns Metadata object with frame metadata
 */
export function generateFrameMetadata({
  title,
  description,
  image,
  baseUrl,
  username,
}: FrameMetadataProps): Metadata {
  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'View My Profile',
      },
      {
        label: 'Share Profile',
      },
    ],
    image: image,
    post_url: `${baseUrl}/api/frame${username ? `?username=${username}` : ''}`,
  });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    other: {
      ...frameMetadata,
    },
  };
}

/**
 * Component to render frame metadata in the document head
 * 
 * @param props - Frame metadata properties
 * @returns JSX element with frame metadata
 */
export default function FrameMetadata({
  title,
  description,
  image,
  baseUrl,
  username,
}: FrameMetadataProps) {
  const frameMetadata = getFrameMetadata({
    buttons: [
      {
        label: 'View My Profile',
      },
      {
        label: 'Share Profile',
      },
    ],
    image: image,
    post_url: `${baseUrl}/api/frame${username ? `?username=${username}` : ''}`,
  });

  return (
    <>
      {Object.entries(frameMetadata).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
    </>
  );
}

