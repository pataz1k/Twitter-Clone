import { AnimatePresence } from 'motion/react'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import LoadingScreen from './LoadingScreen'
import useSettingsStore from '@/stores/settings.store'
import useUserStore from '@/stores/user.store'

const LoadingWrapper: FC<PropsWithChildren> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)

	// const {isLoading:isSettingsLoading} = useSettingsStore()
	// const {isLoading:isUserLoading,isAuth} = useUserStore()

	// useEffect(() => {
	// 	if (isAuth) {
	// 		setIsLoading(isSettingsLoading || isUserLoading)
	// 	}
	// }, [isSettingsLoading, isUserLoading,isAuth])


	setTimeout(() => {
		setIsLoading(false)
	}, 2000)


	return (
		<>
			<AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
			{children}
		</>
	)
}
export default LoadingWrapper
