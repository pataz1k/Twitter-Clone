export interface IBannerColor {
	first: string
	second: string
	third: string
}
export interface IUserSettings {
	username: string
	fullname: string
	avatar: string
	bio: string
	settings: {
		banner: IBannerColor
	}
}
