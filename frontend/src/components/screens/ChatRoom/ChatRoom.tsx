import { useRouter } from 'next/router'
import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import MaterialIcon from '@/components/ui/MaterialIcons'

import { AuthContext } from '@/providers/AuthProvider'

import { IMessage } from '@/shared/types/message.types'

import styles from './ChatRoom.module.scss'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import Meta from '@/utils/meta/Meta'

interface IChatRoom {
	receiverAccountID: string
}

const ChatRoom: FC<IChatRoom> = ({ receiverAccountID }) => {
	const { accountUsername, accountID, accessToken } = useContext(AuthContext)
	const [socket, setSocket] = useState<Socket | null>(null)
	const [messages, setMessages] = useState<IMessage[]>([])
	const [newMessage, setNewMessage] = useState('')
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const [receiverUsername, setReceiverUsername] = useState('')
	const router = useRouter()

	useEffect(() => {
		if (accessToken && receiverAccountID) {
			UserService.getUserById(accessToken, receiverAccountID).then((res) => {
				console.log(res)
				setReceiverUsername(res.data.data.username)
			})
		}
	}, [accessToken, receiverAccountID])

	useEffect(() => {
		const newSocket = io(process.env.SOCKET_URL)
		setSocket(newSocket)

		newSocket.on('connect', () => {
			console.log('connected to socket')
			newSocket.emit('join', accountID)
		})

		return () => {
			newSocket.disconnect()
		}
	}, [accountUsername, accountID])

	useEffect(() => {
		if (!socket) return

		const messageHandler = (message: IMessage) => {
			setMessages((prevMessages) => [...prevMessages, message])
		}

		socket.on('message', messageHandler)

		return () => {
			socket.off('message', messageHandler)
		}
	}, [socket])

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	const fetchMessages = useCallback(async () => {
		if (accessToken && receiverAccountID) {
			try {
				const data = await MessageService.getMessages(
					accessToken,
					receiverAccountID
				)
				setMessages(data.data)
			} catch (error) {
				console.error('Error fetching messages:', error)
			}
		}
	}, [accessToken, receiverAccountID])

	useEffect(() => {
		fetchMessages()
	}, [fetchMessages])

	const handleSend = useCallback(() => {
		if (newMessage.trim() && socket) {
			const messageData = {
				sender: accountID,
				receiver: receiverAccountID,
				message: newMessage,
			}
			socket.emit('message', messageData)
			setNewMessage('')
		}
	}, [newMessage, socket, accountID, receiverAccountID])

	return (
		<Meta title={`Chat with ${receiverUsername}`}>
			<div className="flex flex-col h-screen w-full bg-transparent text-gray-100">
				<div className="bg-gray-800 p-4 border-b border-gray-700 flex gap-2">
					<button onClick={router.back} className={styles.backButton}>
						<MaterialIcon name="MdArrowBack" />
					</button>
					<h2 className="text-xl font-semibold">
						Chat with {receiverUsername}
					</h2>
				</div>
				<div className="flex-grow overflow-y-auto p-4">
					<div className="flex flex-col gap-4">
						{messages.map((message) => (
							<div
								key={message._id}
								className={`flex ${message.sender === accountID ? 'justify-end' : 'justify-start'}`}
							>
								<div
									className={`rounded-lg px-4 py-2 max-w-[80%] ${
										message.sender === accountID
											? 'bg-blue-600 text-white'
											: 'bg-gray-700 text-gray-100'
									}`}
								>
									<p>{message.message}</p>
									<p className="text-xs mt-1 opacity-75">
										{new Date(message.timestamp).toLocaleString()}
									</p>
								</div>
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>
				</div>
				<div className="bg-gray-800 p-4 flex gap-2">
					<input
						type="text"
						placeholder="Type a message..."
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleSend()
							}
						}}
						className="flex-1 rounded-full px-4 py-2 bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						onClick={handleSend}
						className="bg-blue-600 text-white rounded-full px-6 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Send
					</button>
				</div>
			</div>
		</Meta>
	)
}

export default ChatRoom
