import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js App',
    short_name: 'Next.js App',
    description: 'Next.js App',
    start_url: '/',
    display: 'standalone',
    background_color: '#ff0',
    theme_color: '#f00',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}