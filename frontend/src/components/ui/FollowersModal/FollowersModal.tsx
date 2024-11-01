import { FC } from 'react'

import { IFollowUser } from '@/shared/types/profile.types'

import UsersList from './UsersList'

interface IFollowersModal {
	isOpen: boolean
	onClose: () => void
	followers: IFollowUser[] | []
}

const FollowersModal: FC<IFollowersModal> = ({
	isOpen,
	onClose,
	followers,
}) => {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px]">
			<div className="relative bg-black rounded-lg p-6 shadow-lg max-w-md w-full border border-gray-800">
				<button
					className="absolute top-2 right-2 text-xl text-white"
					onClick={onClose}
				>
					&times;
				</button>
				<h2 className="text-lg font-bold text-white mt-[-13px]">Users</h2>
				<UsersList followers={followers} />
			</div>
		</div>
	)
}
export default FollowersModal
