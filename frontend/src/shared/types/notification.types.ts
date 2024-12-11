import { IUser } from "./post.types"

export interface INotification {
    read: boolean
    _id: string
    link: string
    receiver: string
    sender: IUser
    message: string
    createdAt: string
}