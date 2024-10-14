export interface IPost {
	tags: string[]
	files: string[]
	likes: string[]
	retweets: string[]
	likesCount: number
	retweetCount: number
	comments: string[]
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
