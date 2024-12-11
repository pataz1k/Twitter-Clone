import Link from 'next/link'
import { FC } from 'react'


export interface INotify {
	text: string
	sender: {
		_id: string
		username: string
		avatar: string
	}
	link:string
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
					<img
						src={notify.sender.avatar}
						alt={notify.sender.username}
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex-1">
					<h3 className="font-semibold text-white">{notify.sender.username}</h3>
					<p className="text-sm text-gray-400">{notify.text}</p>
				</div>
				<svg
					className="text-blue-400 w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>
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
