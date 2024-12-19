export const getPostUrl = (id: string) => `/post/${id}`
export const getUserPageUrl = (username: string) => `/user/${username}`
export const getDMPageUrl = (id: string) => `/messages/${id}`
export const getTagPageUrl = (tag: string) => `/tag/${tag.slice(1)}`