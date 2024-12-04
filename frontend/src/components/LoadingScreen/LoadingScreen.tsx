import { motion } from 'motion/react'

const LoadingScreen = () => {
	return (
		<motion.div
			className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
			initial={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				initial={{ scale: 0, opacity: 0, rotate: -180 }}
				animate={{ scale: 1, opacity: 1, rotate: 0 }}
				exit={{ scale: 0, opacity: 0, rotate: 180 }}
				transition={{
					type: 'spring',
					stiffness: 260,
					damping: 20,
					duration: 1.5,
				}}
			>
				<svg
					className="w-24 h-24 text-white"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<g>
						<path
							fill="currentColor"
							d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
						></path>
					</g>
				</svg>
			</motion.div>
		</motion.div>
	)
}

export default LoadingScreen
