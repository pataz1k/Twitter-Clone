import { FC, PropsWithChildren, useEffect } from 'react'

import useSettingsStore from '@/stores/settings.store'

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	const { isDarkMode } = useSettingsStore()

	useEffect(() => {
		const root = window.document.documentElement
		root.classList.toggle('dark', isDarkMode)
	}, [isDarkMode])

	return <>{children}</>
}
export default ThemeProvider
