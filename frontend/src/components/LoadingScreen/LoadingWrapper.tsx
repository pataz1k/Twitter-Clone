import { AnimatePresence } from 'motion/react'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import LoadingScreen from './LoadingScreen'
import useSettingsStore from '@/stores/settings.store'
import useUserStore from '@/stores/user.store'

const LoadingWrapper: FC<PropsWithChildren> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const isSettingsLoading = useSettingsStore((state) => state.isLoading)
	const isUserLoading = useUserStore((state) => state.isLoading)

	// useEffect(() => {
	// 	setIsLoading(isSettingsLoading || isUserLoading)
	// }, [isSettingsLoading, isUserLoading])

	setTimeout(() => {
		setIsLoading(false)
	}, 5000)

	return (
		<>
			<AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
			{children}
		</>
	)
}
export default LoadingWrapper
