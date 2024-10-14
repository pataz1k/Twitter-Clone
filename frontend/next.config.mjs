/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	optimizeFonts: false,
	env: {
		SERVER_URL: process.env.SERVER_URL,
	},
	images: {
		domains: ['res.cloudinary.com', 'via.placeholder.com', 'localhost'],
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
