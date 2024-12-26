import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import TimeItem from '@/components/ui/TimeItem'

import { IComment } from '@/shared/types/comment.types'

import { getUserPageUrl } from '@/config/url.config'

const CommentsItem: FC<IComment> = ({
	user,
	text,
	createdAt,
	isCommentMine,
}) => {
	return (
		<div
			className={`mb-4 p-4 rounded-lg ${isCommentMine ? 'bg-gray-800' : 'bg-gray-900'}`}
		>
			<div className="flex items-start space-x-3">
				<div className="flex-shrink-0">
					<Image
						src={user.avatar}
						alt={user.username}
						width={40}
						height={40}
						className="rounded-full w-10 h-10"
					/>
				</div>
				<div className="flex-grow">
					<div className="flex items-center justify-between">
						<Link
							href={getUserPageUrl(user.username)}
							className="text-sm font-semibold text-gray-300 hover:text-blue-400 transition-colors"
						>
							{user.username}
						</Link>

						<TimeItem time={createdAt} textSize="xs" />
					</div>
					<p className="mt-1 text-sm text-gray-400">{text}</p>
					{isCommentMine && (
						<p className="mt-2 text-xs text-gray-600">This is your comment</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default CommentsItem
