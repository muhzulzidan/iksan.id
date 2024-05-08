/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.amazonaws.com',
                port: '',
                pathname: '/*',
            },
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.ctfassets.net',
                port: '',
                pathname: '/*',
            },
            {
                protocol: 'https',
                hostname: `${process.env.WORDPRESS_API_URL.match(/(?!(w+)\.)\w*(?:\w+\.)+\w+/)[0]}`,
                port: '',
                pathname: '/*',
            },
            {
                protocol: 'https',
                hostname: 'iksanbangsawan.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
                port: '',
                pathname: '/*',
            },
            {
                protocol: 'https',
                hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
                port: '',
                pathname: '/*',
            },

        ],
    },

};

export default nextConfig;
