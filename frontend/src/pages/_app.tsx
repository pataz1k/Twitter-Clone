import { GeistSans } from 'geist/font/sans'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import MainProvider from '@/providers/MainProvider'

import useNotificationStore from '@/stores/notification.store'
import useSettingsStore from '@/stores/settings.store'
import useUserStore from '@/stores/user.store'
import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
	const { verifyToken, accessToken, isAuth } = useUserStore()
	const { getUserSettings } = useSettingsStore()
	const { updateNotificationsCount } = useNotificationStore()

	useEffect(() => {
		verifyToken()
	}, [verifyToken, accessToken])

	useEffect(() => {
		if (isAuth) {
			getUserSettings(isAuth, accessToken)
		} else {
			getUserSettings(false, '')
		}
	}, [getUserSettings, isAuth, accessToken])

	useEffect(() => {
		if (isAuth) {
			updateNotificationsCount(accessToken)
		}
	}, [accessToken, isAuth, updateNotificationsCount])

	return (
		<MainProvider>
			<div className={GeistSans.className} data-theme="dark">
				<Component {...pageProps} />
			</div>
		</MainProvider>
	)
}
