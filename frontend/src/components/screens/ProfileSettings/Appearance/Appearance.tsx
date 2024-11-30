import { FC } from 'react'

import Heading from '@/components/ui/Heading'

import BannerSettings from './BannerSettings/BannerSettings'

const Appearance: FC = () => {
	return (
		<div>
			<Heading
				title="Appearance"
				className="border-b border-gray-700 pb-4 text-xl"
			/>
			<BannerSettings />
		</div>
	)
}
export default Appearance
