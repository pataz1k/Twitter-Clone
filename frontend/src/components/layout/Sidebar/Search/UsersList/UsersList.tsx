import { FC, useState } from 'react'

import ProfileItem from '@/components/ui/ProfileItem/ProfileItem'

import { IUser } from '@/shared/types/post.types'

interface IUsersList {
	users: IUser[]
}

const UsersList: FC<IUsersList> = ({ users }) => {
	const [showAll, setShowAll] = useState(false)
	const displayUsers = showAll ? users : users.slice(0, 3)

	return (
		<div className="space-y-2">
			{users.length ? (
				<>
					{displayUsers.map((user) => (
						<ProfileItem
							key={user._id}
							avatar={user.avatar}
							username={user.username}
							id={user._id}
						/>
					))}
					{users.length > 3 && (
						<button
							className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium"
							onClick={() => setShowAll(!showAll)}
						>
							{showAll ? 'Show less' : `Show ${users.length - 3} more`}
						</button>
					)}
				</>
			) : (
				<p className="text-gray-400 text-sm">No users found</p>
			)}
		</div>
	)
}

export default UsersList
