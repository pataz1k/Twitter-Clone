import cn from 'classnames'
import { FC, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import PostListSkeleton from '../../PostsList/PostListSkeleton'

import styles from './ProfileSkeleton.module.scss'

const ProfileSkeleton: FC = () => {
	const [postsType, setPostsType] = useState<'created' | 'saved'>('created')
	return (
		<>
			<div className="border border-gray-800 rounded-lg mt-5">
				<div className={styles.banner}></div>
				<div className="ml-2">
					<div className="mt-[-65px] mb-3">
						<Skeleton
							width={130}
							height={130}
							circle
							className="border-[6px] border-black"
						/>
					</div>
					<Skeleton count={4} height={10} width={180} />
				</div>
			</div>
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
			<PostListSkeleton />
		</>
	)
}

export default ProfileSkeleton
