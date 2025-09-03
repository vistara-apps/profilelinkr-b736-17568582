    import ProfileCard from '../../components/ProfileCard';

    interface User {
      fid: number;
      display_name: string;
      username: string;
      profile: {
        bio: { text: string };
        picture: { url: string };
      };
    }

    async function getUser(username: string): Promise<{ user: User } | null> {
      try {
        const res = await fetch(`https://api.neynar.com/v2/farcaster/user-by-username?username=${username}`, {
          headers: {
            api_key: process.env.NEYNAR_API_KEY || '',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch');
        return await res.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
      const { username } = await params;
      const data = await getUser(username);
      const user = data?.user;

      if (!user) {
        return (
          <div className="flex min-h-screen items-center justify-center bg-bg p-4">
            <div className="max-w-sm mx-auto text-center text-red-500">Profile not found.</div>
          </div>
        );
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-bg p-4">
          <div className="max-w-sm mx-auto w-full">
            <ProfileCard user={user} showShare={false} />
          </div>
        </div>
      );
    }
  