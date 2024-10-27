import cn from 'classnames'
import { FC, useContext, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import TagsList from '@/components/layout/Sidebar/Search/TagsList/TagsList'
import ImageGallery from '@/components/ui/ImageGallery'
import MaterialIcon from '@/components/ui/MaterialIcons'
import Profile from '@/components/ui/ProfileItem'
import TimeItem from '@/components/ui/TimeItem'

import { AuthContext } from '@/providers/AuthProvider'

import { IPost } from '@/shared/types/post.types'

import styles from './PostsList.module.scss'
import { PostService } from '@/services/post.service'

const PostItem: FC<{ post: IPost; refetchPosts: () => void }> = ({
	post,
	refetchPosts,
}) => {
	const { accountID, isAuth, accessToken } = useContext(AuthContext)
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
		<div className="p-4 border border-gray-700 rounded-xl flex flex-col items-start">
			<Profile
				id={post.user._id}
				avatar={post.user.avatar}
				username={post.user.username}
			/>
			{post.caption}
			{post.files.length !== 0 && <ImageGallery images={post.files} />}
			{post.tags.length !== 0 && <TagsList tags={post.tags} />}
			<div className="text-zinc-400 mt-4">
				<TimeItem time={post.createdAt} />
			</div>
			<div className="w-full h-[1px] bg-zinc-700 my-3"></div>
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
				<button>
					<MaterialIcon name="MdModeComment" />
					<span>{post.commentsCount}</span>
				</button>
			</div>
		</div>
	)
}

export default PostItem
