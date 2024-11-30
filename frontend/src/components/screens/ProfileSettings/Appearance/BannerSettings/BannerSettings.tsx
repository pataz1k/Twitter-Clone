import { FC, useState } from 'react'

import GradientBanner from '@/components/ui/GradientBanner'

import { BannerColors, BannerColorsEnum } from './BannerColors'

const BannerSettings: FC = () => {
	const [selectedColor, setSelectedColor] = useState<BannerColorsEnum>(
		BannerColorsEnum.DEFAULT
	)
	return (
		<div className="mt-3">
			<GradientBanner banner={BannerColors[selectedColor]} />
			<select
				value={selectedColor}
				onChange={(e) => setSelectedColor(e.target.value as BannerColorsEnum)}
				className="mt-3 bg-gray-700 text-white border-none outline-none p-2 rounded w-full"
			>
				<option value="" disabled hidden>
					Pick Color
				</option>
				<option value={BannerColorsEnum.DEFAULT}>Default</option>
				<option value={BannerColorsEnum.PURPLE}>Purple</option>
				<option value={BannerColorsEnum.ORANGE}>Orange</option>
				<option value={BannerColorsEnum.GREEN}>Green</option>
				<option value={BannerColorsEnum.RED}>Red</option>
				<option value={BannerColorsEnum.PINK}>Pink</option>
			</select>
		</div>
	)
}
export default BannerSettings
