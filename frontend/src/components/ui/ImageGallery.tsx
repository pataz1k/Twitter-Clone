import cn from 'classnames'
import { AnimatePresence, motion } from 'motion/react'
import { FC, useState } from 'react'

import FullScreenGallery from './FullScreenGallery'

const ImageGallery: FC<{ images: string[] }> = ({ images }) => {
	const [active, setActive] = useState(images[0])
	const [isFullScreen, setIsFullScreen] = useState(false)

	const toggleFullScreen = () => {
		setIsFullScreen(!isFullScreen)
	}

	return (
		<div className="grid gap-4 my-2">
			<motion.div
				onClick={toggleFullScreen}
				className="cursor-pointer"
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				<motion.img
					key={active}
					className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
					src={active}
					alt="active image"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				/>
			</motion.div>

			<div className="flex overflow-x-auto gap-4 snap-x">
				{images.map((imagelink, index) => (
					<motion.div
						key={index}
						className={cn('flex-shrink-0 snap-start transition-all', {
							'brightness-100': imagelink === active,
							'brightness-50 hover:brightness-90': imagelink !== active,
						})}
						whileTap={{ scale: 0.95 }}
					>
						<img
							draggable={false}
							onClick={() => setActive(imagelink)}
							src={imagelink}
							className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
							alt="gallery-image"
						/>
					</motion.div>
				))}
			</div>

			<AnimatePresence>
				{isFullScreen && (
					<FullScreenGallery
						images={images}
						active={active}
						onClose={() => setIsFullScreen(false)}
					/>
				)}
			</AnimatePresence>
		</div>
	)
}

export default ImageGallery
