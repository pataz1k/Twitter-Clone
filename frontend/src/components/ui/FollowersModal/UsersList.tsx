import { FC } from 'react'

import { IFollowUser } from '@/shared/types/profile.types'

import ProfileItem from '../ProfileItem'

const UsersList: FC<{ followers: IFollowUser[] }> = ({ followers }) => {

	return (
		<div className="flex flex-col mt-2">
			<div className="max-h-[400px] overflow-y-auto pr-2">
				<div className="flex flex-col">
					{followers.length > 0 ? (
						followers.map((follower, index) => (
							<div key={follower._id + index}>
								<ProfileItem
									id={follower._id}
									avatar={follower.avatar}
									username={follower.username}
								/>
							</div>
						))
					) : (
						<h1>Empty :(</h1>
					)}
				</div>
			</div>
		</div>
	)
}
export default UsersList
