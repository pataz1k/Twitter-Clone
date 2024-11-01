import { IPost } from './post.types'

export interface IProfile {
	fullname: string
	avatar: string
	bio: string
	website: string
	followers: IFollowUser[]
	followersCount: number
	followingCount: number
	following: IFollowUser[]
	posts: IPost[]
	postCount: number
	savedPosts: IPost[]
	_id: string
	username: string
	createdAt: string
}

export interface IFollowUser {
	username: string
	avatar: string
	_id: string
}
