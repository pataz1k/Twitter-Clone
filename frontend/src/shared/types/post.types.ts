import { IComment } from './comment.types'

export interface IPost {
	tags: string[]
	files: string[]
	likes: string[]
	retweets: string[]
	likesCount: number
	retweetCount: number
	comments: IComment[]
	commentsCount: number
	_id: string
	caption: string
	user: IUser
	createdAt: string
}

export interface IUser {
	avatar: string
	_id: string
	username: string
}
export interface ITag {
	tag: string
	count: number
}
