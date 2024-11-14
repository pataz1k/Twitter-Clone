import { FC } from 'react'

import ProfileItem from '@/components/ui/ProfileItem/ProfileItem'

import { IUser } from '@/shared/types/post.types'

import styles from './UsersList.module.scss'

interface IUsersList {
	users: IUser[]
}

const UsersList: FC<IUsersList> = ({ users }) => {
	return (
		<div>
			{users.length ? (
				users.map((user) => (
					<ProfileItem
						key={user._id}
						avatar={user.avatar}
						username={user.username}
						id={user._id}
					/>
				))
			) : (
				<h1>Users Not Found</h1>
			)}
		</div>
	)
}
export default UsersList
