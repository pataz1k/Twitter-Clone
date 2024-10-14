import { IPost } from './post.types'

export interface IProfile {
	fullname: string
	avatar: string
	bio: string
	website: string
	followers: string[]
	followersCount: number
	followingCount: number
	following: string[]
	posts: IPost[]
	postCount: number
	savedPosts: IPost[]
	_id: string
	username: string
	createdAt: string
}
