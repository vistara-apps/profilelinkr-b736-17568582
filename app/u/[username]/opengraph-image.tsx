import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';
export const alt = 'ProfileLinkr - Your Digital Identity, Instantly Sharable';
export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { username: string } }) {
  const { username } = params;
  
  try {
    // Fetch user data from Farcaster
    const res = await fetch(`https://api.neynar.com/v2/farcaster/user-by-username?username=${username}`, {
      headers: {
        api_key: process.env.NEYNAR_API_KEY || '',
      },
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const data = await res.json();
    const user = data.user;
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Generate a custom image for the user
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#f2f5f9',
            padding: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 40,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              width: '90%',
              height: '90%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 30,
                width: '100%',
              }}
            >
              <img
                src={user.profile.picture.url}
                alt={user.display_name}
                width={120}
                height={120}
                style={{
                  borderRadius: 12,
                  marginRight: 20,
                }}
              />
              <div>
                <h1
                  style={{
                    fontSize: 48,
                    fontWeight: 'bold',
                    color: '#0c4a8c',
                    margin: 0,
                  }}
                >
                  {user.display_name}
                </h1>
                <p
                  style={{
                    fontSize: 24,
                    color: '#6366f1',
                    margin: 0,
                  }}
                >
                  @{user.username}
                </p>
              </div>
            </div>
            <p
              style={{
                fontSize: 24,
                color: '#333',
                marginBottom: 30,
                width: '100%',
                textAlign: 'left',
              }}
            >
              {user.profile.bio.text || 'No bio provided'}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#0c4a8c',
                  fontSize: 20,
                }}
              >
                <span>View on Farcaster</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#0c4a8c',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: 8,
                  fontSize: 20,
                }}
              >
                View Profile
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                fontSize: 16,
                color: '#666',
              }}
            >
              ProfileLinkr
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    
    // Return a fallback image on error
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#f2f5f9',
            padding: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 40,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              width: '90%',
              height: '90%',
            }}
          >
            <h1
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                color: '#0c4a8c',
                marginBottom: 20,
              }}
            >
              ProfileLinkr
            </h1>
            <p
              style={{
                fontSize: 30,
                color: '#333',
                textAlign: 'center',
                marginBottom: 20,
              }}
            >
              Your Digital Identity, Instantly Sharable
            </p>
            <p
              style={{
                fontSize: 24,
                color: '#666',
                textAlign: 'center',
              }}
            >
              Profile not found
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}

