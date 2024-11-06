import { axiosClassic } from '@/api/interceptors'
import { getUsersUrl } from '@/config/api.config'

export const UserService = {
	async getAll(token: string) {
		return axiosClassic.get(getUsersUrl(''), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	async getUser(token:string, username: string) {
		return axiosClassic.get(getUsersUrl(username), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}
}
