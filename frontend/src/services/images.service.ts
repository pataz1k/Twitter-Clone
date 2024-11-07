import { axiosClassic } from '@/api/interceptors'

export const ImagesService = {
	uploadImage: async (files: FileList) => {
		const formData = new FormData()
		Array.from(files).forEach((file, index) => {
			formData.append(`images`, file)
		})
		return axiosClassic.post('upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
}
