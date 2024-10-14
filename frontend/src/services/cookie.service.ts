import Cookies from 'js-cookie'

export const CookieService = {
	async getAccessToken() {
		return Cookies.get('accessToken')
	},
	async setAccessToken(accessToken: string) {
		Cookies.set('accessToken', accessToken, { expires: 30 })
	},
}
