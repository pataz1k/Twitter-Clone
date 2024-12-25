import { FC } from 'react'

import Search from '@/components/layout/Sidebar/Search/Search'
import Heading from '@/components/ui/Heading'

import PopularTags from './PopularTags/PopularTags'
import PopularUsers from './PopularUsers/PopularUsers'
import Meta from '@/utils/meta/Meta'

const Explore: FC = () => {
	return (
		<Meta title="Explore">
			<Heading title="Explore" className='my-2'/>
			<Search />
			<div className='flex flex-col gap-2 md:flex-row'>
				<PopularTags />
				<PopularUsers />
			</div>
		</Meta>
	)
}
export default Explore
