import { motion } from 'motion/react'
import { FC, useState } from 'react'

import PostsList from '@/components/PostsList/PostsList'

import { TabButton } from '@/ui/TabButton/TabButton'

import { IProfile } from '@/shared/types/profile.types'

const ProfilePostList: FC<{
	profile: IProfile
	refetchPosts: () => void
}> = ({ profile, refetchPosts }) => {
	const [postsType, setPostsType] = useState<'created' | 'saved'>('created')

	return (
		<div className="mt-6">
			<div className="flex justify-center mb-6">
				<div className="bg-gray-800 p-1 rounded-full inline-flex">
					<TabButton
						active={postsType === 'created'}
						onClick={() => setPostsType('created')}
					>
						Tweets
					</TabButton>
					<TabButton
						active={postsType === 'saved'}
						onClick={() => setPostsType('saved')}
					>
						Saved Posts
					</TabButton>
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
			>
				{postsType === 'created' ? (
					<PostsList posts={profile.posts} refetchPosts={refetchPosts} />
				) : (
					<PostsList posts={profile.savedPosts} refetchPosts={refetchPosts} />
				)}
			</motion.div>
		</div>
	)
}

export default ProfilePostList
