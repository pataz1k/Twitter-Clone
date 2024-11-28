import cn from 'classnames'
import { FC, useState } from 'react'

const ImageGallery: FC<{ images: string[] }> = ({ images }) => {
	const [active, setActive] = useState(images[0])
	return (
		<div className="grid gap-4 my-2">
			<div>
				<img
					className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px] "
					src={active}
					alt="active image"
				/>
			</div>

			<div className="flex overflow-x-auto gap-4 snap-x">
				{images.map((imgelink, index) => (
					<div
						key={index}
						className={cn('flex-shrink-0 snap-start', {
							'brightness-100': imgelink === active,
							'brightness-50': imgelink !== active,
						})}
					>
						<img
							draggable={false}
							onClick={() => setActive(imgelink)}
							src={imgelink}
							className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center "
							alt="gallery-image"
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default ImageGallery
