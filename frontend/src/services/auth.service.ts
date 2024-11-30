import { IUserSettings } from '@/shared/types/settings.types'

import { axiosClassic } from '@/api/interceptors'
import { getAuthUrl } from '@/config/api.config'

export const AuthService = {
	async auth(authType: string, authData: any) {
		return axiosClassic.post(getAuthUrl(authType), authData)
	},
	async me(token: string) {
		return axiosClassic.get(getAuthUrl('me'), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	async checkToken(token: string) {
		return axiosClassic.get(getAuthUrl('check-token'), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	async getSettings(token: string) {
		return axiosClassic.get(getAuthUrl('settings'), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	async updateSettings(token: string, settings: IUserSettings) {
		return axiosClassic.patch(getAuthUrl('settings'), settings, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
}
