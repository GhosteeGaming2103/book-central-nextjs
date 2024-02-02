/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // Amazon S3 bucket
        domains: ['book-central-nextjs.s3.amazonaws.com'],
    },

};

export default nextConfig;
