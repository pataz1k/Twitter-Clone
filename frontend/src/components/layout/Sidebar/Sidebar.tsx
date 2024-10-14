import { FC } from 'react'

import Search from './Search/Search'
import Users from './Users/Users'

const Sidebar: FC = () => {
	const auth = false

	return (
		<div className="p-5">
			<Search />
			{auth && <Users />}
		</div>
	)
}
export default Sidebar
