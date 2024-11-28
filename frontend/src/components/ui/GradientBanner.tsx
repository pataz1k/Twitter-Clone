import { motion } from 'motion/react'
import { FC } from 'react'

import { IProfileBanner } from '@/shared/types/profile.types'

const GradientBanner: FC<{ banner: IProfileBanner }> = ({ banner }) => {
	return (
		<div className="relative">
			<motion.div
				className="h-[200px] w-full relative rounded-lg rounded-br-sm rounded-bl-sm"
				style={{
					boxShadow:
						'0 0 10px 1px rgba(0,212,255,0.2), 0 0 20px 1px rgba(50,130,189,0.2)',
				}}
				initial={{
					background: banner.first,
				}}
				animate={{
					background: [banner.first, banner.second, banner.third, banner.first],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: 'linear',
				}}
			>
				<div
					className="absolute -inset-1 rounded-xl opacity-40"
					style={{
						background: 'inherit',
						filter: 'blur(5px)',
						zIndex: -1,
					}}
				/>
			</motion.div>
		</div>
	)
}

export default GradientBanner
