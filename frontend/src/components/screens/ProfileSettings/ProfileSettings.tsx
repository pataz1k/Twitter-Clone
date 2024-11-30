import { FC } from 'react'

import BackButton from '@/components/ui/BackButton/BackButton'
import Heading from '@/components/ui/Heading'

import Appearance from './Appearance/Appearance'
import useSettingsStore from '@/stores/settings.store'
import useUserStore from '@/stores/user.store'

const ProfileSettings: FC = () => {
	const { applySettings } = useSettingsStore()
	const { accessToken } = useUserStore()
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex-grow">
				<div className="flex gap-4 align-middle mt-2 mb-5">
					<BackButton />
					<Heading title="Profile Settings" />
				</div>
				<Appearance />
			</div>
			<div className="sticky bottom-0 right-0 p-4 bg-background border-t border-gray-700">
				<button
					onClick={() => {
						applySettings(accessToken)
					}}
					className="bg-blue-500 hover:bg-blue-700 p-2 px-6 rounded-2xl transition-colors h-11 flex items-center justify-center ml-auto"
				>
					Apply
				</button>
			</div>
		</div>
	)
}

export default ProfileSettings
