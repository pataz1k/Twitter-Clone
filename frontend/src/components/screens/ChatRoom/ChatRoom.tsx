import { AnimatePresence } from 'motion/react'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import BackButton from '@/components/ui/BackButton/BackButton'
import MaterialIcon from '@/components/ui/MaterialIcons'

import { IMessage } from '@/shared/types/message.types'

import ChatMenu from './ChatMenu'
import { MessageService } from '@/services/message.service'
import { UserService } from '@/services/user.service'
import useUserStore from '@/stores/user.store'
import Meta from '@/utils/meta/Meta'

interface IChatRoom {
	receiverAccountID: string
}

const ChatRoom: FC<IChatRoom> = ({ receiverAccountID }) => {
	const { username, accountID, accessToken } = useUserStore()
	const [receiverUsername, setReceiverUsername] = useState('')
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [newMessage, setNewMessage] = useState('')
	const [messages, setMessages] = useState<IMessage[]>([])

	const [socket, setSocket] = useState<Socket | null>(null)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (accessToken && receiverAccountID) {
			UserService.getUserById(accessToken, receiverAccountID).then((res) => {
				setReceiverUsername(res.data.data.username)
			})
		}
	}, [accessToken, receiverAccountID])

	useEffect(() => {
		const newSocket = io(process.env.SOCKET_URL)
		setSocket(newSocket)

		newSocket.on('connect', () => {
			newSocket.emit('join', accountID)
		})

		return () => {
			newSocket.disconnect()
		}
	}, [username, accountID])

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
		messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
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
			<div className="flex flex-col h-screen bg-gray-900 bg-opacity-30 text-gray-100">
				<header className="bg-gray-800 p-4 flex items-center gap-4 border-b border-gray-700">
					<BackButton />
					<h2 className="text-xl font-semibold flex-grow">
						Chat with {receiverUsername}
					</h2>
					<div className="relative">
						<button
							onClick={() => {
								setIsDropdownOpen(!isDropdownOpen)
							}}
							className="text-gray-400 hover:text-gray-200"
						>
							<MaterialIcon name="MdMoreVert" />
						</button>
						<AnimatePresence>
							{isDropdownOpen && (
								<ChatMenu
									receiverAccountID={receiverUsername}
									onClose={() => setIsDropdownOpen(false)}
								/>
							)}
						</AnimatePresence>
					</div>
				</header>
				<main className="flex-grow overflow-y-auto p-4 space-y-4 ">
					{messages.map((message) => (
						<div
							key={message._id}
							className={`flex ${message.sender === accountID ? 'justify-end' : 'justify-start'}`}
						>
							<div
								className={`rounded-lg px-4 py-2 max-w-[70%] ${
									message.sender === accountID
										? 'bg-blue-600 text-white'
										: 'bg-gray-700 text-gray-100'
								}`}
							>
								<p className="break-words">{message.message}</p>
								<p className="text-xs mt-1 opacity-75">
									{new Date(message.timestamp).toLocaleString()}
								</p>
							</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</main>
				<footer className="bg-gray-800 p-4">
					<div className="flex items-center gap-2 bg-gray-700 rounded-full p-2">
						<button disabled className="text-gray-400 hover:text-gray-200 p-2">
							<MaterialIcon name="MdAttachFile" />
						</button>
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
							className="flex-grow bg-transparent text-gray-100 focus:outline-none"
						/>
						<button
							onClick={handleSend}
							className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<MaterialIcon name="MdSend" />
						</button>
					</div>
				</footer>
			</div>
		</Meta>
	)
}

export default ChatRoom
