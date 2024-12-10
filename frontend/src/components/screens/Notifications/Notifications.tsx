import { FC } from 'react'

import Heading from '@/components/ui/Heading'

import NotificationsList from './NotificationsList/NotificationsList'
import Meta from '@/utils/meta/Meta'

const Notifications: FC = () => {
	return (
		<>
			<Meta title="Notifications">
				<Heading title="Notifications" />
				<NotificationsList />
			</Meta>
		</>
	)
}
export default Notifications
