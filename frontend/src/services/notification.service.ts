import { axiosClassic } from '@/api/interceptors'
import { getNotificationsUrl } from '@/config/api.config'

export const NotificationService = {
	async getNotifications(token: string) {
		return axiosClassic.get(getNotificationsUrl(''), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	async getUnReadNotifications(token: string) {
		return axiosClassic.get(getNotificationsUrl('unread-count'), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	async markNotificationsAsRead(token: string) {
		return axiosClassic.get(getNotificationsUrl('mark-all-read'), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	async markNotificationAsReadById(token:string, id:string) {
		return axiosClassic.get(getNotificationsUrl(`mark-as-read/${id}`), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}
}
