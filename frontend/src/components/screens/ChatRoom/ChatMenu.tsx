import { useClickAway } from '@uidotdev/usehooks'
import { motion } from 'motion/react'
import Link from 'next/link'
import { FC } from 'react'

import { getUserPageUrl } from '@/config/url.config'

interface IChatMenu {
	onClose: () => void
	receiverAccountID: string
}

const ChatMenu: FC<IChatMenu> = ({ onClose, receiverAccountID }) => {
	const clickOutside = useClickAway<HTMLDivElement>(onClose)

	return (
		<motion.div
			ref={clickOutside}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="absolute z-50 border border-gray-700 right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5"
		>
			<div
				className="py-1"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="options-menu"
			>
				<button
					disabled
					className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
					role="menuitem"
				>
					Clear Chat History
				</button>
				<Link
					href={getUserPageUrl(receiverAccountID)}
					className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
					role="menuitem"
				>
					Open Profile
				</Link>
				<button
					disabled
					className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
					role="menuitem"
				>
					Report User
				</button>
			</div>
		</motion.div>
	)
}
export default ChatMenu
