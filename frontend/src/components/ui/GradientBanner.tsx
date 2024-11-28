import { motion } from 'motion/react'
import { FC } from 'react'

const GradientBanner: FC = () => {
	const gradients = {
		first:
			'linear-gradient(90deg, rgba(98,135,179,1) 0%, rgba(50,130,189,1) 51%, rgba(0,212,255,1) 100%)',
		second:
			'linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(98,135,179,1) 51%, rgba(50,130,189,1) 100%)',
		third:
			'linear-gradient(90deg, rgba(50,130,189,1) 0%, rgba(0,212,255,1) 51%, rgba(98,135,179,1) 100%)',
	}

	return (
		<div className="relative">
			<motion.div
				className="h-[200px] w-full relative rounded-lg rounded-br-sm rounded-bl-sm"
				style={{
					boxShadow:
						'0 0 10px 1px rgba(0,212,255,0.2), 0 0 20px 1px rgba(50,130,189,0.2)',
				}}
				initial={{
					background: gradients.first,
				}}
				animate={{
					background: [
						gradients.first,
						gradients.second,
						gradients.third,
						gradients.first,
					],
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
