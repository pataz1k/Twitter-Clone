import toast from 'react-hot-toast'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { IBannerColor, IUserSettings } from '@/shared/types/settings.types'

import { AuthService } from '@/services/auth.service'

interface ISettingsStore {
	isDarkMode: boolean
	isChanged: boolean
	banner: IBannerColor
	setBannerColor: (banner: IBannerColor) => void
	getUserSettings: (isAuth: boolean, accessToken: string) => Promise<void>
	setIsDarkMode: (isDarkMode: boolean) => void
	applySettings: (token: string) => void
}

const useSettingsStore = create<ISettingsStore>()(
	persist(
		devtools((set, get) => ({
			isDarkMode: false,
			isChanged: false,
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
						set({ banner: res.data.data.settings.banner, isChanged: false })
					} catch (err) {
						console.log(err)
					}
				}
			},
			setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
			applySettings: async (token: string) => {
				const settings: IUserSettings = {
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
		})),
		{ name: 'settings-store', version: 2 }
	)
)

export default useSettingsStore
