import { FC } from 'react'

import Heading from '@/components/ui/Heading'
import cn from 'classnames'

import NotificationsList from './NotificationsList/NotificationsList'
import Meta from '@/utils/meta/Meta'
import { useQuery } from 'react-query'
import { NotificationService } from '@/services/notification.service'
import useUserStore from '@/stores/user.store'
import { INotification } from '@/shared/types/notification.types'
import NotAuth from '@/components/ui/NotAuth'
import useNotificationStore from '@/stores/notification.store'


interface INotificationResponse {
	success:boolean
	data: INotification[]
}

const Notifications: FC = () => {
	const { accessToken, isAuth } = useUserStore()
	const {unReadNotifications, updateNotificationsCount} = useNotificationStore()

	const { isSuccess, isLoading, data, refetch } = useQuery(
		['get detail post'],
		() => NotificationService.getNotifications(accessToken),
		{
			select: ({ data }: { data: INotificationResponse }) => data,
			enabled: isAuth ,
		}
	)
	console.log(data)
	if (!isAuth) {
		return <NotAuth/>
	}
	if (isLoading) {
		return <div>Loading...</div>
	}

	const readAllNotifications = () => {
		NotificationService.markNotificationsAsRead(accessToken)
		.then((res) => {
			console.log(res)
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
				<div className='flex justify-between my-5'>
					<Heading title="Notifications" />
					<button onClick={readAllNotifications} disabled={unReadNotifications == 0} className={cn(
										'p-2 px-4 rounded-xl transition-colors h-11 flex items-center justify-center',
										{
											'bg-blue-500 hover:bg-blue-700': unReadNotifications > 0,
											'bg-slate-600 hover:bg-slate-700 cursor-not-allowed': unReadNotifications == 0,
										}
									)}>Read All</button>
					</div>
				{isSuccess&& <NotificationsList notifications={data?.data!} />}
			</Meta>
		</>
	)
}
export default Notifications
