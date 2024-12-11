import Link from 'next/link'
import { useRouter } from 'next/router'
import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'
import toast from 'react-hot-toast'
import { Socket, io } from 'socket.io-client'

import Notification, { INotify } from '@/components/ui/Notification'

import { getDMPageUrl } from '@/config/url.config'
import useUserStore from '@/stores/user.store'
import useNotificationStore from '@/stores/notification.store'

interface INotificationsContext {
	notifications: string[]
	readAllNotifications: () => void
}

const initialValue = {
	notifications: [],
	readAllNotifications: () => {},
}

const NotificationsContext = createContext<INotificationsContext>(initialValue)

const NotificationsProvider: FC<PropsWithChildren> = ({ children }) => {
	const { accountID, isAuth, accessToken } = useUserStore()
	const {updateNotificationsCount} = useNotificationStore()
	const [socket, setSocket] = useState<Socket | null>(null)
	const [notifications, setNotifications] = useState<string[]>([])
	const { asPath } = useRouter()

	useEffect(() => {
		if (isAuth && accountID) {
			const newSocket = io(process.env.SOCKET_URL)
			setSocket(newSocket)

			newSocket.on('connect', () => {
				newSocket.emit('join', accountID)
				console.log(`Join with id - ${accountID}`)
			})

			return () => {
				newSocket.disconnect()
			}
		}
	}, [accountID, isAuth])

	useEffect(() => {
		if (!socket) return

		const notificationsHandler = (notify: INotify) => {
			console.log(notify)
			updateNotificationsCount(accessToken)
			toast(
				(t) => (
					<Notification notify={notify} onClose={() => toast.dismiss(t.id)} />
				),
				{
					style: {
						backgroundColor: 'transparent',
						border: 'none',
						boxShadow: 'none',
						padding: '0',
						margin: '0',
						borderRadius: '0',
					},
					duration: 2000,
				}
			)
		}

		socket.on('notification', notificationsHandler)

		return () => {
			socket.off('notification', notificationsHandler)
		}
	}, [socket, asPath,accessToken,updateNotificationsCount])

	const readAllNotifications = () => {
		setNotifications([])
	}

	return (
		<NotificationsContext.Provider
			value={{ notifications, readAllNotifications }}
		>
			{children}
		</NotificationsContext.Provider>
	)
}
export { NotificationsContext, NotificationsProvider }
