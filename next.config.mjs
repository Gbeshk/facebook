/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'www.facebook.com', 
      'scontent.ftbs6-2.fna.fbcdn.net',
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'platform-lookaside.fbsbx.com',
      's.gravatar.com',
      'your-custom-domain.com'
    ],
  },
};

export default nextConfig;