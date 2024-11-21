import { axiosClassic } from '@/api/interceptors'

export const MessageService = {
	getMessages: async (accountID: string, receiverID: string) => {
		return axiosClassic.get(`messages/${accountID}/${receiverID}`)
	},
}
