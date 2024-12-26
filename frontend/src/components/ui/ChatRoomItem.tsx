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
			<div className="flex items-center p-4 bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-lg border border-gray-700 shadow-md hover:shadow-lg">
				<div className="relative w-14 h-14 mr-4 rounded-full overflow-hidden border-2 border-gray-600">
					<Image
						src={avatar}
						alt={`${username}'s avatar`}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover"
					/>
				</div>
				<div className="flex-grow">
					<h3 className="text-xl font-semibold text-gray-200 mb-1">
						{username}
					</h3>
					<p className="text-sm text-gray-400 line-clamp-1">
						{truncateMessage(lastMessage, 50)}
					</p>
				</div>
			</div>
		</Link>
	)
}

export default ChatRoomItem
