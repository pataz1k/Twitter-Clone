import { FC } from 'react'

import Search from '@/components/layout/Sidebar/Search/Search'
import Heading from '@/components/ui/Heading'

import Meta from '@/utils/meta/Meta'
import PopularTags from './PopularTags/PopularTags'

const Explore: FC = () => {
	return (
		<Meta title="Explore">
			<Heading title="Explore" />
			<Search/>
			<PopularTags/>
		</Meta>
	)
}
export default Explore
