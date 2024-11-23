import { useRouter } from 'next/router'
import { FC } from 'react'

import ChatRoom from '@/components/screens/ChatRoom/ChatRoom'

const Chat: FC = () => {
	const router = useRouter()
	const r: string = router.query.userID?.toString() || ''
	return <ChatRoom receiverAccountID={r} />
}
export default Chat
