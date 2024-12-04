import toast from 'react-hot-toast'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { IBannerColor, IUserSettings } from '@/shared/types/settings.types'

import { AuthService } from '@/services/auth.service'

interface ISettingsStore {
	isLoading: boolean
	isDarkMode: boolean
	isChanged: boolean
	banner: IBannerColor
	username: string
	fullname: string
	avatar: string
	bio: string
	setBannerColor: (banner: IBannerColor) => void
	setUsername: (username: string) => void
	setFullname: (fullname: string) => void
	setAvatar: (avatar: string) => void
	setBio: (bio: string) => void
	getUserSettings: (isAuth: boolean, accessToken: string) => Promise<void>
	toggleTheme: () => void
	applySettings: (token: string) => void
}

const useSettingsStore = create<ISettingsStore>()(
	persist(
		devtools((set, get) => ({
			isLoading: true,
			isDarkMode: true,
			isChanged: false,
			username: '',
			fullname: '',
			avatar: '',
			bio: '',
			banner: {
				first: '',
				second: '',
				third: '',
			},
			setBannerColor: (banner: IBannerColor) =>
				set({ banner: banner, isChanged: true }),
			getUserSettings: async (isAuth: boolean, accessToken: string) => {
				if (isAuth) {
					try {
						const res = await AuthService.getSettings(accessToken)
						set({
							banner: res.data.data.settings.banner,
							username: res.data.data.username,
							fullname: res.data.data.fullname,
							avatar: res.data.data.avatar,
							bio: res.data.data.bio,
							isChanged: false,
							isLoading: false,
						})
					} catch (err) {
						set({ isLoading: false })
						console.log(err)
					}
				}
			},
			toggleTheme: () => set({ isDarkMode: !get().isDarkMode }),
			applySettings: async (token: string) => {
				const settings: IUserSettings = {
					username: get().username,
					fullname: get().fullname,
					avatar: get().avatar,
					bio: get().bio,
					settings: {
						banner: get().banner,
					},
				}
				AuthService.updateSettings(token, settings)
					.then((res) => {
						toast.success('Settings applied successfully')
						set({ isChanged: false })
					})
					.catch((err) => {
						toast.error(err.response.data.message)
					})
			},
			setUsername: (username: string) =>
				set({ username: username, isChanged: true }),
			setFullname: (fullname: string) =>
				set({ fullname: fullname, isChanged: true }),
			setAvatar: (avatar: string) => set({ avatar: avatar, isChanged: true }),
			setBio: (bio: string) => set({ bio: bio, isChanged: true }),
		})),
		{ name: 'settings-store', version: 4 }
	)
)

export default useSettingsStore
