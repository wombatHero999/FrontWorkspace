import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'http',
        hostname:'k.kakaocdn.net',
        port:'',
        pathname:'/**'
      },
      {
        protocol:'https',
        hostname:'k.kakaocdn.net',
        port:'',
        pathname:'/**'
      }
    ]
  }
};

export default nextConfig;
