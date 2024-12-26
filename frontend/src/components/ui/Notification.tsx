import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import MaterialIcon from './MaterialIcons'

export interface INotify {
	text: string
	sender: {
		_id: string
		username: string
		avatar: string
	}
	link: string
}

interface NotificationProps {
	notify: INotify
	onClose: () => void
}

const Notification: FC<NotificationProps> = ({ notify, onClose }) => {
	return (
		<div className="w-80 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
			<div className="flex items-center space-x-4">
				<div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
					<Image
						height={40}
						width={40}
						src={notify.sender.avatar}
						alt={notify.sender.username}
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex-1">
					<h3 className="font-semibold text-white">{notify.sender.username}</h3>
					<p className="text-sm text-gray-400">{notify.text}</p>
				</div>
				<MaterialIcon name="MdNotifications" classname="text-blue-400 size-5" />
			</div>
			<div className="mt-4 flex justify-end">
				<Link href={notify.link} passHref>
					<button
						onClick={onClose}
						className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						Check
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Notification
