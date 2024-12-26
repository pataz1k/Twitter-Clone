import { FC } from 'react'
import { useQuery } from 'react-query'

import ChatRoomItem from '@/components/ui/ChatRoomItem'
import Heading from '@/components/ui/Heading'
import MaterialIcon from '@/components/ui/MaterialIcons'
import NotAuth from '@/components/ui/NotAuth'

import { MessageService } from '@/services/message.service'
import useUserStore from '@/stores/user.store'
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
	const { isAuth, accessToken } = useUserStore()

	const { isSuccess, data } = useQuery(
		['get user dialogs'],
		() => MessageService.getAllDialogs(accessToken),
		{
			select: ({ data }: { data: IDialog[] }) => data,
			enabled: isAuth,
		}
	)

	if (!isAuth) {
		return <NotAuth />
	}

	if (!isSuccess || !data) {
		return null
	}

	if (data.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-gray-400 rounded-lg p-8">
				<MaterialIcon name="MdMessage" classname="size-24 mb-4 text-gray-300" />
				<h2 className="text-3xl font-bold mb-4 text-gray-200">No Chats Yet</h2>
				<p className="text-center max-w-md text-lg">
					Start a conversation with someone to see your chats here. Your dialogs
					will appear once you begin messaging.
				</p>
			</div>
		)
	}

	return (
		<Meta title="Chats">
			<div className="flex flex-col gap-6 p-6 text-gray-200 rounded-lg shadow-lg">
				<Heading title="Chats" className="text-3xl font-bold text-gray-100" />
				<div className="space-y-4">
					{data.map((dialog) => (
						<ChatRoomItem
							key={dialog.chatMember._id}
							_id={dialog.chatMember._id}
							username={dialog.chatMember.username}
							avatar={dialog.chatMember.avatar}
							lastMessage={dialog.lastMessage.message}
						/>
					))}
				</div>
			</div>
		</Meta>
	)
}

export default Dialogs
