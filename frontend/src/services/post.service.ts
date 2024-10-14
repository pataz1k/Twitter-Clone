import { axiosClassic } from '@/api/interceptors'
import { getPostsUrl } from '@/config/api.config'

export const PostService = {
	async findByCaption(searchTerm: string) {
		return axiosClassic.get(getPostsUrl(`search?caption=${searchTerm}`))
	},
	async getAll() {
		return axiosClassic.get(getPostsUrl(''))
	},
}
