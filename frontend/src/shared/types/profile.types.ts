import { IPost } from './post.types'

export interface IProfile {
	fullname: string
	isFollowing?: boolean
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
	settings: IProfileSettings
	_id: string
	username: string
	createdAt: string
}

export interface IFollowUser {
	username: string
	avatar: string
	_id: string
}

export interface IUser {
	username: string
	avatar: string
	_id: string
	followersCount: number
}

export interface IProfileSettings {
	banner: IProfileBanner
}

export interface IProfileBanner {
	first: string
	second: string
	third: string
}
