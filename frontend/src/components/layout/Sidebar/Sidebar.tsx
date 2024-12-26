import { FC } from 'react'

import Search from './Search/Search'

const Sidebar: FC = () => {
	return (
		<aside className="p-6 h-full">
			<div className="mb-8">
				<Search />
			</div>
			{/* Add more sidebar content here if needed */}
		</aside>
	)
}

export default Sidebar
