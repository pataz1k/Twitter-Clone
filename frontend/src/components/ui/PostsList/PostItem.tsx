import cn from 'classnames'
import { FC, useState } from 'react'

import TagsList from '@/components/layout/Sidebar/Search/TagsList/TagsList'
import ImageGallery from '@/components/ui/ImageGallery'
import MaterialIcon from '@/components/ui/MaterialIcons'
import Profile from '@/components/ui/ProfileItem'
import TimeItem from '@/components/ui/TimeItem'

import { IPost } from '@/shared/types/post.types'

import styles from './PostsList.module.scss'

const PostItem: FC<{ post: IPost }> = ({ post }) => {
	const [isLiked, setIsLiked] = useState(false)
	const isLogined = true

	return (
		<div className="p-4 border border-gray-700 rounded-xl flex flex-col items-start">
			<Profile profile={post.user} />
			{post.caption}
			{post.files.length !== 0 && <ImageGallery images={post.files} />}
			{post.tags.length !== 0 && <TagsList tags={post.tags} />}
			<div className="text-zinc-400 mt-4">
				<TimeItem time={post.createdAt} />
			</div>
			<div className="w-full h-[1px] bg-zinc-700 my-3"></div>
			<div className={styles.buttonWrap}>
				<button
					disabled={!isLogined}
					className={cn({
						[styles.active]: isLiked,
					})}
					onClick={() => {
						setIsLiked(!isLiked)
					}}
				>
					<MaterialIcon name="MdFavorite" />
					<span>{post.likesCount}</span>
				</button>
				<button disabled={!isLogined}>
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
