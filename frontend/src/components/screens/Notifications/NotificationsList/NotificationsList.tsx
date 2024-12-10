import { FC } from 'react'

import NotificationsItem from './NotificationsItem'

const NotificationsList: FC = () => {
	const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	return (
		<div>
			<div className="flex flex-col gap-4">
				{test.map((item, index) => (
					<div key={index}>
						<NotificationsItem />
					</div>
				))}
			</div>
		</div>
	)
}
export default NotificationsList
