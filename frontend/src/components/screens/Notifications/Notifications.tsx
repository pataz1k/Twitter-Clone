import cn from 'classnames'
import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'react-query'

import Heading from '@/components/ui/Heading'
import NotAuth from '@/components/ui/NotAuth'

import { INotification } from '@/shared/types/notification.types'

import NotificationsList from './NotificationsList/NotificationsList'
import { NotificationService } from '@/services/notification.service'
import useNotificationStore from '@/stores/notification.store'
import useUserStore from '@/stores/user.store'
import Meta from '@/utils/meta/Meta'

interface INotificationResponse {
	success: boolean
	data: INotification[]
}

const Notifications: FC = () => {
	const { accessToken, isAuth } = useUserStore()
	const { unReadNotifications, updateNotificationsCount } =
		useNotificationStore()

	const { isSuccess, isLoading, data, refetch } = useQuery(
		['get notifications'],
		() => NotificationService.getNotifications(accessToken),
		{
			select: ({ data }: { data: INotificationResponse }) => data,
			enabled: isAuth,
		}
	)
	if (!isAuth) {
		return <NotAuth />
	}

	const readAllNotifications = () => {
		NotificationService.markNotificationsAsRead(accessToken)
			.then((res) => {
				refetch()
				updateNotificationsCount(accessToken)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<>
			<Meta title="Notifications">
				<div className="flex justify-between my-5">
					<Heading title="Notifications" />
					<button
						onClick={readAllNotifications}
						disabled={unReadNotifications == 0}
						className={cn(
							'p-2 px-4 rounded-xl transition-colors h-11 flex items-center justify-center',
							{
								'bg-blue-500 hover:bg-blue-700': unReadNotifications > 0,
								'bg-slate-600 cursor-not-allowed': unReadNotifications == 0,
							}
						)}
					>
						Read All
					</button>
				</div>
				{isSuccess && <NotificationsList notifications={data?.data!} />}
				{isLoading && <Skeleton count={8} height={80} className="my-1" />}
			</Meta>
		</>
	)
}
export default Notifications
