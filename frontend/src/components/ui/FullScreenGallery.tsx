import cn from 'classnames'
import { motion } from 'motion/react'
import { FC, useCallback, useEffect, useState } from 'react'

import MaterialIcon from './MaterialIcons'

interface FullScreenGalleryProps {
	images: string[]
	active: string
	onClose: () => void
}

const FullScreenGallery: FC<FullScreenGalleryProps> = ({
	images,
	active,
	onClose,
}) => {
	const [activeImage, setActiveImage] = useState<string>(active)

	const handleNextImage = useCallback(() => {
		const imageIndex = images.indexOf(activeImage)
		if (imageIndex === images.length - 1) {
			setActiveImage(images[0])
		} else {
			setActiveImage(images[imageIndex + 1])
		}
	}, [images, activeImage])

	const handlePrevImage = useCallback(() => {
		const imageIndex = images.indexOf(activeImage)
		if (imageIndex === 0) {
			setActiveImage(images[images.length - 1])
		} else {
			setActiveImage(images[imageIndex - 1])
		}
	}, [images, activeImage])

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose()
			} else if (event.key === 'ArrowRight') {
				handleNextImage()
			} else if (event.key === 'ArrowLeft') {
				handlePrevImage()
			}
		},
		[onClose, handleNextImage, handlePrevImage]
	)

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyDown])

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
			tabIndex={0}
		>
			<motion.img
				key={activeImage}
				src={activeImage}
				alt="fullscreen image"
				className="max-h-full max-w-full object-contain"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.8, opacity: 0 }}
				transition={{ duration: 0.3 }}
			/>
			<button
				onClick={onClose}
				className="absolute top-4 right-4 text-white text-2xl"
				aria-label="Close fullscreen"
			>
				<MaterialIcon
					name="MdClose"
					classname="hover:text-red-500 transition-colors"
				/>
			</button>

			{images.length >= 2 && (
				<>
					<motion.button
						whileTap={{ transform: 'translateX(8px)' }}
						className="absolute right-5 top-[50%] text-white text-2xl"
						onClick={handleNextImage}
					>
						<MaterialIcon
							name="MdArrowForward"
							classname="hover:text-blue-500 transition-colors size-8"
						/>
					</motion.button>
					<motion.button
						className="absolute left-5 top-[50%] text-white text-2xl"
						onClick={handlePrevImage}
						whileTap={{ transform: 'translateX(-8px)' }}
					>
						<MaterialIcon
							name="MdArrowBack"
							classname="hover:text-blue-500 transition-colors size-8"
						/>
					</motion.button>
					<motion.div
						className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2 px-4 overflow-x-auto"
						initial={{ y: 50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 50, opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						{images.map((imagelink, index) => (
							<motion.img
								key={index}
								src={imagelink}
								alt={`thumbnail ${index + 1}`}
								className={cn(
									'h-16 w-16 object-cover cursor-pointer rounded flex-shrink-0',
									{
										'border-2 border-white': imagelink === activeImage,
									}
								)}
								onClick={(e) => {
									e.stopPropagation()
									setActiveImage(imagelink)
								}}
								whileTap={{ scale: 0.9 }}
							/>
						))}
					</motion.div>
				</>
			)}
		</motion.div>
	)
}

export default FullScreenGallery
