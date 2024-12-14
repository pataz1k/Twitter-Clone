import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface IChatRoomItem {
	_id: string
	username: string
	avatar: string
	lastMessage: string
}

const ChatRoomItem: FC<IChatRoomItem> = ({
	_id,
	username,
	avatar,
	lastMessage,
}) => {
	const truncateMessage = (message: string, maxLength: number) => {
		return message.length > maxLength
			? message.substring(0, maxLength - 3) + '...'
			: message
	}

	return (
		<Link href={`/messages/${_id}`} className="block">
			<div className="flex items-center p-4 hover:bg-gray-800 transition-colors duration-200 rounded-lg bg-transparent border border-gray-800">
				<div className="relative w-12 h-12 mr-4">
					<Image
						src={avatar}
						alt={`${username}'s avatar`}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="rounded-full object-cover"
					/>
				</div>
				<div className="flex-grow">
					<h3 className="text-lg font-semibold text-gray-200">{username}</h3>
					<p className="text-sm text-gray-400">
						{truncateMessage(lastMessage, 50)}
					</p>
				</div>
			</div>
		</Link>
	)
}

export default ChatRoomItem
