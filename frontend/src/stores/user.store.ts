import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { AuthService } from '@/services/auth.service'

interface IUserStore {
	isLoading: boolean
	username: string
	avatar: string
	accountID: string
	accessToken: string
	isAuth: boolean
	expireAuthStatus: () => void
	setUsername: (username: string) => void
	verifyToken: () => Promise<void>
	setAccessToken: (accessToken: string) => Promise<void>
}

const useUserStore = create<IUserStore>()(
	persist(
		devtools((set, get) => ({
			isLoading: true,
			username: '',
			avatar: '',
			accessToken: '',
			isAuth: false,
			accountID: '',
			expireAuthStatus: () => {
				set({ isAuth: false, accessToken: '' })
			},
			setUsername: (username: string) => set({ username }),
			verifyToken: async () => {
				const { accessToken } = get()
				if (!accessToken) {
					set({ isAuth: false, isLoading: false })
					return
				}

				try {
					const checkTokenRes = await AuthService.checkToken(accessToken)
					if (checkTokenRes.data.success) {
						const meRes = await AuthService.me(accessToken)
						set({
							isAuth: true,
							isLoading: false,
							username: meRes.data.data.username,
							accountID: meRes.data.data._id,
							avatar: meRes.data.data.avatar,
						})
					} else {
						set({ isAuth: false, isLoading: false })
					}
				} catch (err) {
					set({ isAuth: false, isLoading: false })
				}
			},
			setAccessToken: async (accessToken: string) => {
				set({ accessToken })
				await get().verifyToken()
			},
		})),
		{ name: 'user-store', version: 3 }
	)
)

export default useUserStore
