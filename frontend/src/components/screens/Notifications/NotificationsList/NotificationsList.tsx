import { FC } from 'react'
import NotificationsItem from './NotificationsItem'
import { INotification } from '@/shared/types/notification.types'

interface INotificationsList {
  notifications: INotification[] | null | undefined
}

const NotificationsList: FC<INotificationsList> = ({ notifications }) => {
  if (notifications == null || notifications == undefined) {
    return <h1>No notifications available</h1>
  }

  if (!Array.isArray(notifications)) {
    return <h1>Error: Invalid notifications data</h1>
  }

  if (notifications.length === 0) {
    return <h1>No notifications</h1>
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {notifications.map((item, index) => (
          <NotificationsItem key={item._id || index} notification={item} />
        ))}
      </div>
    </div>
  )
}

export default NotificationsList

