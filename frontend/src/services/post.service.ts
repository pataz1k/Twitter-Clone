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
	async createPost(
		token: string,
		caption: string,
		images: string[],
		tags: string[]
	) {
		return axiosClassic.post(
			getPostsUrl(''),
			{ caption: caption, files: images, tags: tags },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	},
	async getPostById(id: string, token: string) {
		return axiosClassic.get(getPostsUrl(id), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	async addComment(postId: string, text: string, token: string) {
		return axiosClassic.post(
			getPostsUrl(`${postId}/comments`),
			{
				text: text,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	},
	async getTags() {
		return axiosClassic.get(getPostsUrl('tags'))
	},
	async getPostsByTag(tag: string) {
		return axiosClassic.get(getPostsUrl(`tags/${tag.slice(1)}`))
	},
}
