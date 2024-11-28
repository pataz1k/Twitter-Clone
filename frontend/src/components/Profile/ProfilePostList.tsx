import cn from 'classnames'
import { FC, useState } from 'react'

import PostsList from '@/components/PostsList/PostsList'

import { IProfile } from '@/shared/types/profile.types'

import styles from './Profile.module.scss'

const ProfilePostList: FC<{
	profile: IProfile
	refetchPosts: () => void
}> = ({ profile, refetchPosts }) => {
	const [postsType, setPostsType] = useState<'created' | 'saved'>('created')

	return (
		<>
			<div className={styles.pickBlock}>
				<span
					className={cn({ [styles.active]: postsType === 'created' })}
					onClick={() => {
						setPostsType('created')
					}}
				>
					Tweets
				</span>
				<span
					className={cn({ [styles.active]: postsType === 'saved' })}
					onClick={() => {
						setPostsType('saved')
					}}
				>
					Saved Posts
				</span>
			</div>

			<div>
				{postsType === 'created' ? (
					<PostsList posts={profile.posts} refetchPosts={refetchPosts} />
				) : (
					<PostsList posts={profile.savedPosts} refetchPosts={refetchPosts} />
				)}
			</div>
		</>
	)
}
export default ProfilePostList
