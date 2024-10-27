import { axiosClassic } from '@/api/interceptors'
import { getPostsUrl } from '@/config/api.config'

export const PostService = {
	async findByCaption(searchTerm: string) {
		return axiosClassic.get(getPostsUrl(`search?caption=${searchTerm}`))
	},
	async getAll() {
		return axiosClassic.get(getPostsUrl(''))
	},
	async toggleLike(postId: string, token: string) {
		return axiosClassic.get(getPostsUrl(`${postId}/togglelike`), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	async toggleRetweet(postId: string, token: string) {
		return axiosClassic.get(getPostsUrl(`${postId}/toggleRetweet`), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
}
