import { IUser } from "./post.types"

export interface IComment {
    _id: string
    user: IUser
    text: string
    createdAt: string
    isCommentMine: boolean
}
