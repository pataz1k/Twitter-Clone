import { FC } from 'react'

import Search from '@/components/layout/Sidebar/Search/Search'
import Heading from '@/components/ui/Heading'

import Meta from '@/utils/meta/Meta'

const Explore: FC = () => {
	return (
		<Meta title="Explore">
			<Heading title="Explore" />
			<div className="w-full bg-blue-500 h-32"></div>
		</Meta>
	)
}
export default Explore
