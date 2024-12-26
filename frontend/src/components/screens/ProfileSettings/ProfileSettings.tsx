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
				<header className="flex-grow">
					<div className="flex gap-4 align-middle mt-2 mb-5">
						<BackButton />
						<Heading title="Profile Settings" />
					</div>
				</header>
				<main className="mb-5">
					<ProfileInfo />
					<Appearance />
				</main>
				<footer className="sticky bottom-0 right-0 p-4 bg-background border-t border-gray-700">
					<button
						disabled={!isChanged}
						onClick={() => {
							applySettings(accessToken)
						}}
						className={`p-2 px-6 rounded-full transition-colors h-11 flex items-center justify-center ml-auto ${
							isChanged
								? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
								: 'bg-gray-600 text-gray-400 cursor-not-allowed'
						}`}
					>
						Apply
					</button>
				</footer>
			</div>
		</Meta>
	)
}

export default ProfileSettings
