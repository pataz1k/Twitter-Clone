import cn from 'classnames'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import ImageGallery from '@/components/ui/ImageGallery'
import MaterialIcon from '@/components/ui/MaterialIcons'
import ProfileItem from '@/components/ui/ProfileItem/ProfileItem'
import TimeItem from '@/components/ui/TimeItem'

import { IPost } from '@/shared/types/post.types'

import styles from './PostsList.module.scss'
import { getPostUrl } from '@/config/url.config'
import { PostService } from '@/services/post.service'
import useUserStore from '@/stores/user.store'

const PostItem: FC<{ post: IPost; refetchPosts: () => void }> = ({
	post,
	refetchPosts,
}) => {
	const { accountID, isAuth, accessToken } = useUserStore()
	const [isLiked, setIsLiked] = useState(post.likes.includes(accountID))
	const [isRetweeted, setIsRetweeted] = useState(
		post.retweets.includes(accountID)
	)

	useEffect(() => {
		setIsLiked(post.likes.includes(accountID))
		setIsRetweeted(post.retweets.includes(accountID))
	}, [accountID, post.likes, post.retweets])

	const likeMutation = useMutation(
		() => PostService.toggleLike(post._id, accessToken),
		{
			onSuccess: refetchPosts,
		}
	)

	const retweetMutation = useMutation(
		() => PostService.toggleRetweet(post._id, accessToken),
		{
			onSuccess: refetchPosts,
		}
	)

	return (
		<div className={cn(styles.wrap, 'bg-gray-900 rounded-xl p-4')}>
			<div className="flex items-center justify-between">
				<ProfileItem
					id={post.user._id}
					avatar={post.user.avatar}
					username={post.user.username}
				/>
				<TimeItem time={post.createdAt} textSize="sm" />
			</div>

			<p className="text-gray-100">{post.caption}</p>

			{post.files.length !== 0 && (
				<div className="mt-2">
					<ImageGallery images={post.files} />
				</div>
			)}

			<div className="border-t border-zinc-700 pt-3 mt-3">
				<div className={styles.buttonWrap}>
					<button
						disabled={!isAuth || likeMutation.isLoading}
						className={cn({ [styles.activeLike]: isLiked })}
						onClick={() => likeMutation.mutate()}
					>
						<MaterialIcon name="MdFavorite" />
						<span>{post.likesCount}</span>
					</button>
					<button
						disabled={!isAuth || retweetMutation.isLoading}
						onClick={() => retweetMutation.mutate()}
						className={cn({ [styles.activeRetweet]: isRetweeted })}
					>
						<MaterialIcon name="MdReply" />
						<span>{post.retweetCount}</span>
					</button>
					<Link href={getPostUrl(post._id)}>
						<MaterialIcon name="MdModeComment" />
						<span>{post.commentsCount}</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default PostItem
