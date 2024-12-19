import { FC } from 'react'

import Search from '@/components/layout/Sidebar/Search/Search'
import Heading from '@/components/ui/Heading'

import PopularTags from './PopularTags/PopularTags'
import Meta from '@/utils/meta/Meta'

const Explore: FC = () => {
	return (
		<Meta title="Explore">
			<Heading title="Explore" />
			<Search />
			<PopularTags />
		</Meta>
	)
}
export default Explore
