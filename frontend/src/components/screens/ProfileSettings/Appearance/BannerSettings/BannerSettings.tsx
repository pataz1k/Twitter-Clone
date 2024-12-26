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
		<div className="space-y-4">
			<div className="rounded-lg overflow-hidden shadow-lg">
				<GradientBanner banner={BannerColors[selectedColor]} />
			</div>
			<select
				value={selectedColor}
				onChange={changeColorHandler}
				className="w-full bg-gray-700 text-white border-none rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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

