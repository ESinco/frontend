/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',           // The source path (where the request comes from)
          destination: '/login', // The target path (where the request should go)
          permanent: true,       // Set to true for a 301 permanent redirect
        },
      ];
    },
  };
  
  export default nextConfig;