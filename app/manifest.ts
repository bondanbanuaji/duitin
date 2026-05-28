import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Duitin OS',
    short_name: 'Duitin',
    description: 'AI-Powered Realtime Financial Tracking',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#080B10',
    theme_color: '#00E5C3',
    icons: [
      {
        src: '/branding/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/branding/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/branding/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
