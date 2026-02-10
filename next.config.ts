import type { NextConfig } from 'next'
import { BACKEND_URL as backendURL } from '@/lib/api/endpoints';
const IsDEV = backendURL.startsWith("http://localhost");

const config: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: IsDEV,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ]
  },
}

export default config