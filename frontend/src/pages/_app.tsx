import { GeistSans } from 'geist/font/sans'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import MainProvider from '@/providers/MainProvider'

import useSettingsStore from '@/stores/settings.store'
import useUserStore from '@/stores/user.store'
import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
	const { verifyToken, accessToken, isAuth } = useUserStore()
	const { getUserSettings } = useSettingsStore()
	useEffect(() => {
		if (accessToken) {
			verifyToken()
		}
	}, [verifyToken, accessToken])

	useEffect(() => {
		if (isAuth) {
			getUserSettings(isAuth, accessToken)
		}
	}, [getUserSettings, isAuth, accessToken])
	return (
		<MainProvider>
			<div className={GeistSans.className} data-theme="dark">
				<Component {...pageProps} />
			</div>
		</MainProvider>
	)
}
