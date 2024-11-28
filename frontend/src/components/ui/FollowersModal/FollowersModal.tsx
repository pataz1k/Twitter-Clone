import { useClickAway } from '@uidotdev/usehooks'
import { AnimatePresence, motion } from 'motion/react'
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
	const modalRef = useClickAway<HTMLDivElement>(() => {
		onClose()
	})

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[2px]">
					<motion.div
						initial={{ scale: 0.5, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
						ref={modalRef}
						className="relative bg-black rounded-lg p-6 shadow-lg max-w-md w-full border border-gray-800"
					>
						<button
							className="absolute top-2 right-2 text-xl text-white"
							onClick={onClose}
						>
							&times;
						</button>
						<h2 className="text-lg font-bold text-white mt-[-13px]">Users</h2>
						<UsersList followers={followers} />
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}
export default FollowersModal
