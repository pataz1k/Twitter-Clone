import { GeistSans } from 'geist/font/sans'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

import MainProvider from '@/providers/MainProvider'

import useUserStore from '@/stores/user.store'
import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
	const { verifyToken, accessToken } = useUserStore()
	useEffect(() => {
		if (accessToken) {
			verifyToken()
		}
	}, [verifyToken, accessToken])

	return (
		<MainProvider>
			<div className={GeistSans.className}>
				<Component {...pageProps} />
			</div>
		</MainProvider>
	)
}
