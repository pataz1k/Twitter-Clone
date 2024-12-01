import { FC } from 'react'

import useSettingsStore from '@/stores/settings.store'
import useUserStore from '@/stores/user.store'

const Notifications: FC = () => {
	const { isDarkMode, toggleTheme } = useSettingsStore()

	return (
		<div>
			<h1>isAuth: {isDarkMode ? 'dark' : 'light'}</h1>
			<button
				className="rounded-2xl bg-slate-500 p-2 text-white"
				onClick={toggleTheme}
			>
				Change Theme
			</button>
		</div>
	)
}
export default Notifications
