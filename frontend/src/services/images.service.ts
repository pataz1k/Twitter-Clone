import { axiosClassic } from '@/api/interceptors'

export const ImagesService = {
	uploadImage: async (files: FileList) => {
		const formData = new FormData()
		for (let i = 0; i < files.length; i++) {
			console.log(files[i].name)
			formData.append('images', files[i])
		}
		Array.from(formData.entries()).map((entry, index) => {
			console.log(entry)
		})
		return axiosClassic.post('upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	},
}
