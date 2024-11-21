import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import { AuthContext } from '@/providers/AuthProvider'

import { MessageService } from '@/services/message.service'

interface IMessage {
	_id: string
	sender: string
	receiver: string
	message: string
	timestamp: string
}

const Messages: FC = () => {
	const { accountUsername, accountID } = useContext(AuthContext)
	const [socket, setSocket] = useState<Socket | null>(null)
	const [messages, setMessages] = useState<IMessage[]>([])
	const [newMessage, setNewMessage] = useState('')
	const [receiver, setReceiver] = useState('668b8f6f8f803a4fe4ff7d7f') // Default receiver ID
	const messagesEndRef = useRef<HTMLDivElement>(null)

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
	}, [accountUsername])

	useEffect(() => {
		if (!socket) return

		const messageHandler = (message: IMessage) => {
			console.log('message received', message.message)
			console.log('user', message.sender)
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
		if (accountID && receiver) {
			MessageService.getMessages(accountID, receiver)
				.then((data: any) => {
					setMessages(data.data)
				})
				.catch((error) => {
					console.error('Error fetching messages:', error)
				})
		}
	}, [accountID, receiver])

	useEffect(() => {
		fetchMessages()
	}, [fetchMessages])

	const handleSend = useCallback(() => {
		if (newMessage.trim() && socket) {
			const messageData = {
				sender: accountID,
				receiver: receiver,
				message: newMessage,
			}
			socket.emit('message', messageData)
			setNewMessage('')
		}
	}, [newMessage, socket, accountID, receiver])

	return (
		<div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
			<div className="bg-gray-100 p-4 border-b">
				<h2 className="text-xl font-semibold text-gray-800">Chat Room</h2>
				<h2 className="text-gray-800">{accountID}</h2>
				<input
					type="text"
					value={receiver}
					onChange={(e) => setReceiver(e.target.value)}
					placeholder="Receiver ID"
					className="mt-2 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
				/>
			</div>
			<div className="h-[400px] overflow-y-auto p-4">
				<div className="flex flex-col gap-4">
					{messages.map((message) => (
						<div
							key={message._id}
							className={`flex ${message.sender === accountID ? 'justify-end' : 'justify-start'}`}
						>
							<div
								className={`rounded-lg px-4 py-2 max-w-[80%] ${
									message.sender === accountID
										? 'bg-blue-500 text-white'
										: 'bg-gray-200 text-gray-800'
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
			<div className="bg-gray-100 p-4 flex gap-2 text-black">
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
					className="flex-1 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					onClick={handleSend}
					className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Send
				</button>
			</div>
		</div>
	)
}

export default Messages
