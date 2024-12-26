import { FC } from 'react'
import { motion } from 'motion/react'

import Heading from '@/components/ui/Heading'
import BannerSettings from './BannerSettings/BannerSettings'

const Appearance: FC = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.1 }}
			className="bg-gray-800 rounded-lg p-6 shadow-lg"
		>
			<Heading
				title="Appearance"
				className="text-xl font-bold mb-6 pb-2 border-b border-gray-700"
			/>
			<BannerSettings />
		</motion.div>
	)
}

export default Appearance

