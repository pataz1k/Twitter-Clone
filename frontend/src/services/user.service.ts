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
	async getUser(token: string, username: string) {
		return axiosClassic.get(getUsersUrl(username), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},

	async followUser(token: string, id: string) {
		return axiosClassic.get(getUsersUrl(`/${id}/follow`), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	async unfollowUser(token: string, id: string) {
		return axiosClassic.get(getUsersUrl(`/${id}/unfollow`), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	async findByUsername(username: string, token: string) {
		return axiosClassic.get(getUsersUrl(`search?username=${username}`), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
}
