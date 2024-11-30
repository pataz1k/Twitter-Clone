import { FC } from 'react'

import Heading from '@/components/ui/Heading'

import Appearance from './Appearance/Appearance'

const ProfileSettings: FC = () => {
	return (
		<div>
			<Heading title="Profile Settings" className="mb-5" />
			<Appearance />
		</div>
	)
}
export default ProfileSettings
