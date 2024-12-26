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
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
				transition={{ type: 'spring', damping: 20, stiffness: 300 }}
				ref={modalRef}
				className="relative bg-gray-900 rounded-xl p-6 shadow-2xl max-w-md w-full border border-gray-700"
			>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold text-white">Users</h2>
					<button
						className="text-gray-400 hover:text-white transition-colors duration-200"
						onClick={onClose}
						aria-label="Close modal"
					>
						<MaterialIcon name='MdClose' classname='size-6' />
					</button>
				</div>
				<div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
					<UsersList followers={followers} />
				</div>
			</motion.div>
		</div>
	)
}

export default FollowersModal

