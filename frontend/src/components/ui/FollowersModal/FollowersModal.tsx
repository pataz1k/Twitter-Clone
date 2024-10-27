import { FC } from 'react'

import UsersList from './UsersList'

interface IFollowersModal {
	isOpen: boolean
	onClose: () => void
}

const FollowersModal: FC<IFollowersModal> = ({ isOpen, onClose }) => {
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
				<h2 className="text-lg font-bold text-white mt-[-13px]">
					Модалка подписчиков
				</h2>
				<UsersList />
			</div>
		</div>
	)
}
export default FollowersModal
