/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	optimizeFonts: false,
	env: {
		SERVER_URL: process.env.SERVER_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'localhost',
				pathname: '**',
			},
		],
	},

	async rewrites() {
		return [
			{
				source: '/images/:path*',
				destination: 'http://localhost:5000/images/:path*',
			},
		]
	},
}

export default nextConfig
