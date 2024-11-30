import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { AuthService } from '@/services/auth.service'

interface IUserStore {
	username: string
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
			username: '',
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
					set({ isAuth: false })
					return
				}

				try {
					const checkTokenRes = await AuthService.checkToken(accessToken)
					if (checkTokenRes.data.success) {
						const meRes = await AuthService.me(accessToken)
						set({
							isAuth: true,
							username: meRes.data.data.username,
							accountID: meRes.data.data._id,
						})
					} else {
						set({ isAuth: false })
					}
				} catch (err) {
					set({ isAuth: false })
				}
			},
			setAccessToken: async (accessToken: string) => {
				set({ accessToken })
				await get().verifyToken()
			},
		})),
		{ name: 'user-store', version: 1 }
	)
)

export default useUserStore
