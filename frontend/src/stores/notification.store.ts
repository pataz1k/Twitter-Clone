import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { NotificationService } from '@/services/notification.service'

interface INotificationStore {
	unReadNotifications: number
	updateNotificationsCount: (token: string) => void
}

const useNotificationStore = create<INotificationStore>()(
	persist(
		devtools((set, get) => ({
			unReadNotifications: 0,
			updateNotificationsCount: (token: string) => {
				NotificationService.getUnReadNotifications(token)
					.then((res) => {
						set({ unReadNotifications: res.data.count })
					})
					.catch((err) => {
						console.error(err)
					})
			},
		})),
		{ name: 'notification-store', version: 1 }
	)
)

export default useNotificationStore
