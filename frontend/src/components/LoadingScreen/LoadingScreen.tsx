import { motion } from 'motion/react'
import Logo from '../ui/Logo'

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
				<Logo className='size-24'/>
			</motion.div>
		</motion.div>
	)
}

export default LoadingScreen
