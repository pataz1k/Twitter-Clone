import { axiosClassic } from '@/api/interceptors'
import { getUsersUrl } from '@/config/api.config'

export const UserService = {
	async getAll(token: string) {
		axiosClassic.get(getUsersUrl(''), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
}
