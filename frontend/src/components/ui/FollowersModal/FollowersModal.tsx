import { useClickAway, useLockBodyScroll } from '@uidotdev/usehooks'
import { motion } from 'motion/react'
import { FC } from 'react'

import { IFollowUser } from '@/shared/types/profile.types'

import UsersList from './UsersList'
import MaterialIcon from '../MaterialIcons'

interface IFollowersModal {
	onClose: () => void
	followers: IFollowUser[] | []
}

const FollowersModal: FC<IFollowersModal> = ({ onClose, followers }) => {
	const modalRef = useClickAway<HTMLDivElement>(() => {
		onClose()
	})
	useLockBodyScroll()

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px]">
			<motion.div
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
				ref={modalRef}
				className="relative bg-gray-800 rounded-lg p-6 shadow-lg max-w-md w-full border border-gray-800"
			>
				<button
					className="absolute top-2 right-2 text-xl text-white"
					onClick={onClose}
				>
					<MaterialIcon name='MdClose' classname='size-6 hover:fill-red-500 transition-colors' />
				</button>
				<h2 className="text-lg font-bold text-white mt-[-13px]">Users</h2>
				<UsersList followers={followers} />
			</motion.div>
		</div>
	)
}
export default FollowersModal
