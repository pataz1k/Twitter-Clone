import { FC, ReactNode } from 'react'

import Heading from '@/components/ui/Heading'

interface IExploreContainer {
	heading: string
	children: ReactNode
}

const ExploreContainer: FC<IExploreContainer> = ({ children, heading }) => {
	return (
		<div className="w-full md:w-1/2 bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6 mt-8">
			<Heading
				title={heading}
				className="text-2xl font-bold text-gray-100 mb-4"
			/>
			{children}
		</div>
	)
}
export default ExploreContainer
