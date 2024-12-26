import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import TimeItem from '@/components/ui/TimeItem'

import { INotification } from '@/shared/types/notification.types'

import { NotificationService } from '@/services/notification.service'
import useNotificationStore from '@/stores/notification.store'
import useUserStore from '@/stores/user.store'

interface NotificationsItemProps {
	notification: INotification
}

const NotificationsItem: FC<NotificationsItemProps> = ({ notification }) => {
	const { read, sender, message, createdAt, link, _id } = notification
	const { accessToken } = useUserStore()
	const { updateNotificationsCount } = useNotificationStore()

	const checkClickHandler = () => {
		if (!read) {
			NotificationService.markNotificationAsReadById(accessToken, _id).then(
				() => {
					updateNotificationsCount(accessToken)
				}
			)
		}
	}

	return (
		<div
			className={`relative flex items-start space-x-4 p-4 rounded-lg transition-colors ${
				read ? 'bg-gray-900' : 'bg-gray-800'
			}`}
		>
			<div className="relative w-10 h-10 rounded-full overflow-hidden">
				<Image
					src={sender.avatar}
					alt={sender.username}
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<div className="flex-1 space-y-1">
				<p className="text-sm font-medium text-white">{sender.username}</p>
				<p className="text-sm text-gray-300">{message}</p>
				<TimeItem time={createdAt} textSize="xs" />
			</div>
			<Link
				href={link}
				onClick={checkClickHandler}
				className="inline-block mt-2 px-3 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 rounded-xl transition-colors"
			>
				Check
			</Link>
			{!read && (
				<div
					className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"
					aria-hidden="true"
				/>
			)}
		</div>
	)
}

export default NotificationsItem
