import cn from 'classnames'
import { FC, useState } from 'react'

const ImageGallery: FC<{ images: string[] }> = ({ images }) => {
	const [active, setActive] = useState(images[0])
	const [isFullScreen, setIsFullScreen] = useState(false)

	const toggleFullScreen = () => {
		setIsFullScreen(!isFullScreen)
	}

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsFullScreen(false)
		}
	}

	return (
		<div className="grid gap-4 my-2">
			<div onClick={toggleFullScreen} className="cursor-pointer">
				<img
					className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
					src={active}
					alt="active image"
				/>
			</div>

			<div className="flex overflow-x-auto gap-4 snap-x">
				{images.map((imagelink, index) => (
					<div
						key={index}
						className={cn('flex-shrink-0 snap-start transition-all', {
							'brightness-100': imagelink === active,
							'brightness-50 hover:brightness-90': imagelink !== active,
						})}
					>
						<img
							draggable={false}
							onClick={() => setActive(imagelink)}
							src={imagelink}
							className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
							alt="gallery-image"
						/>
					</div>
				))}
			</div>

			{isFullScreen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
					onClick={toggleFullScreen}
					onKeyDown={handleKeyDown}
					tabIndex={0}
				>
					<img
						src={active}
						alt="fullscreen image"
						className="max-h-full max-w-full object-contain"
					/>
					<button
						onClick={toggleFullScreen}
						className="absolute top-4 right-4 text-white text-2xl"
						aria-label="Close fullscreen"
					>
						×
					</button>
					<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
						{images.map((imagelink, index) => (
							<img
								key={index}
								src={imagelink}
								alt={`thumbnail ${index + 1}`}
								className={cn('h-16 w-16 object-cover cursor-pointer rounded', {
									'border-2 border-white': imagelink === active,
								})}
								onClick={(e) => {
									e.stopPropagation()
									setActive(imagelink)
								}}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default ImageGallery
