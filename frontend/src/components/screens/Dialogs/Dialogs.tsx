import { FC, useContext } from 'react'
import { useQuery } from 'react-query'

import ChatRoomItem from '@/components/ui/ChatRoomItem'

import { AuthContext } from '@/providers/AuthProvider'

import { MessageService } from '@/services/message.service'
import Meta from '@/utils/meta/Meta'

interface IDialog {
	chatMember: {
		_id: string
		username: string
		avatar: string
	}
	lastMessage: {
		message: string
		timestamp: string
		_id: string
		sender: string
		receiver: string
	}
}

const Dialogs: FC = () => {
	const { isAuth, accessToken } = useContext(AuthContext)

	const { isSuccess, data } = useQuery(
		['get user dialogs'],
		() => MessageService.getAllDialogs(accessToken),
		{
			select: ({ data }: { data: IDialog[] }) => data,
			enabled: isAuth,
		}
	)

	if (!isSuccess || !data || data.length === 0) {
		return null
	}

	return (
		<Meta title={`Chats`}>
			<div className="flex flex-col gap-4 p-4 text-gray-200">
				<h1 className="text-2xl font-bold mb-4">Chats</h1>
				{data.map((dialog, index) => (
					<ChatRoomItem
						key={dialog.chatMember._id}
						_id={dialog.chatMember._id}
						username={dialog.chatMember.username}
						avatar={dialog.chatMember.avatar}
						lastMessage={dialog.lastMessage.message}
					/>
				))}
			</div>
		</Meta>
	)
}

export default Dialogs
