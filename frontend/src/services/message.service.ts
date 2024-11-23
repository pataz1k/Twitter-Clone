import { axiosClassic } from '@/api/interceptors'

export const MessageService = {
	getMessages: async (token: string, receiverID: string) => {
		return axiosClassic.get(`messages/${receiverID}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	getAllDialogs: async (token: string) => {
		return axiosClassic.get(`messages/dialogs`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
}
