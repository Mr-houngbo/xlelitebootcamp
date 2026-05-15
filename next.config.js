/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'api.dicebear.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.pixabay.com', pathname: '/**' },
      { protocol: 'https', hostname: 'i.imgur.com', pathname: '/**' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://connect.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: https://www.facebook.com; font-src 'self' data:; connect-src 'self' https://api.resend.com https://*.supabase.co wss://*.supabase.co https://www.facebook.com; media-src 'self' https:; frame-ancestors 'none';",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
