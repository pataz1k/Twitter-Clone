import { useRouter } from 'next/router'
import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'
import { Socket, io } from 'socket.io-client'

import { getDMPageUrl } from '@/config/url.config'
import useUserStore from '@/stores/user.store'

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
	const { accountID, accessToken } = useUserStore()
	const [socket, setSocket] = useState<Socket | null>(null)
	const [notifications, setNotifications] = useState<string[]>([])
	const router = useRouter()

	useEffect(() => {
		const newSocket = io(process.env.SOCKET_URL)
		setSocket(newSocket)

		newSocket.on('connect', () => {
			newSocket.emit('join', accountID)
		})

		return () => {
			newSocket.disconnect()
		}
	}, [accountID, accessToken])

	useEffect(() => {
		if (!socket) return

		const notificationsHandler = (notify: any) => {
			if (getDMPageUrl(notify.sender) !== router.asPath) {
				// toast.info(notify.text, {
				// 	onClick: () => {
				// 		router.push(getDMPageUrl(notify.sender))
				// 	},
				// })
			}
		}

		socket.on('notification', notificationsHandler)

		return () => {
			socket.off('notification', notificationsHandler)
		}
	}, [socket])

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
