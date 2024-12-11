import { FC } from 'react'

import BackButton from '@/components/ui/BackButton/BackButton'
import Heading from '@/components/ui/Heading'

import Appearance from './Appearance/Appearance'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import useSettingsStore from '@/stores/settings.store'
import useUserStore from '@/stores/user.store'
import Meta from '@/utils/meta/Meta'

const ProfileSettings: FC = () => {
	const { applySettings, isChanged } = useSettingsStore()
	const { accessToken } = useUserStore()
	return (
		<Meta title="Profile Settings">
			<div className="flex flex-col min-h-screen">
				<div className="flex-grow">
					<div className="flex gap-4 align-middle mt-2 mb-5">
						<BackButton />
						<Heading title="Profile Settings" />
					</div>
					<ProfileInfo />
					<Appearance />
				</div>
				<div className="sticky bottom-0 right-0 p-4 bg-background border-t border-gray-700">
					<button
						disabled={!isChanged}
						onClick={() => {
							applySettings(accessToken)
						}}
						className={`p-2 px-6 rounded-2xl transition-colors h-11 flex items-center justify-center ml-auto ${
							isChanged
								? 'bg-blue-500 hover:bg-blue-700 text-white'
								: 'bg-gray-400 cursor-not-allowed text-gray-600'
						}`}
					>
						Apply
					</button>
				</div>
			</div>
		</Meta>
	)
}

export default ProfileSettings
