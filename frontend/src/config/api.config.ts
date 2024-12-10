export const API_URL = process.env.SERVER_URL

export const getPostsUrl = (string: string) => `posts/${string}`
export const getUsersUrl = (string: string) => `users/${string}`
export const getAuthUrl = (authType: string) => `auth/${authType}`
export const getNotificationsUrl = (string: string) => `notifications/${string}`
export const getUploadUrl = () => 'upload/'
