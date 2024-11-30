import { ChangeEvent, FC, useEffect, useState } from 'react'

import GradientBanner from '@/components/ui/GradientBanner'

import {
	BannerColors,
	BannerColorsEnum,
	BannerColorsSelectOptions,
	getBannerColorEnum,
} from './BannerColors'
import useSettingsStore from '@/stores/settings.store'

const BannerSettings: FC = () => {
	const { banner, setBannerColor } = useSettingsStore()
	const [selectedColor, setSelectedColor] = useState<BannerColorsEnum>(
		BannerColorsEnum.DEFAULT
	)

	useEffect(() => {
		if (banner.first && banner.second && banner.third) {
			const colorEnum = getBannerColorEnum(banner)
			setSelectedColor(colorEnum)
		}
	}, [banner])

	const changeColorHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedColor(e.target.value as BannerColorsEnum)
		setBannerColor(BannerColors[e.target.value as BannerColorsEnum])
	}

	return (
		<div className="mt-3">
			<GradientBanner banner={BannerColors[selectedColor]} />
			<select
				value={selectedColor}
				onChange={changeColorHandler}
				className="mt-3 bg-gray-700 text-white border-none outline-none p-2 rounded w-full"
			>
				<option value="" disabled hidden>
					Pick Color
				</option>
				{BannerColorsSelectOptions.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}
export default BannerSettings
