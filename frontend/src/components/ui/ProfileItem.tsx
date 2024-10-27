import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IUser } from '@/shared/types/post.types'

const ProfileItem: FC<{ id: string; avatar: string; username: string }> = ({
	id,
	avatar,
	username,
}) => {
	return (
		<Link
			href={`/user/${id}`}
			className="inline-flex gap-2 items-center mb-3 hover:bg-zinc-900 transition-colors py-2 pr-3 rounded-md"
		>
			<Image
				alt="user avatar"
				src={avatar}
				width={30}
				height={30}
				className="rounded-full"
			/>
			<span className="font-bold">{username}</span>
		</Link>
	)
}
export default ProfileItem
