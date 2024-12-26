import { FC, useState } from 'react'
import { motion } from 'motion/react'

import PostsList from '@/components/PostsList/PostsList'
import { IProfile } from '@/shared/types/profile.types'

const ProfilePostList: FC<{
	profile: IProfile
	refetchPosts: () => void
}> = ({ profile, refetchPosts }) => {
	const [postsType, setPostsType] = useState<'created' | 'saved'>('created')

	return (
		<div className="mt-6">
			<div className="flex justify-center mb-6">
				<TabWrapper>
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
				</TabWrapper>
			</div>

			<motion.div
				initial={{ opacity: 0}}
				animate={{ opacity: 1}}
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

interface TabWrapperProps {
	children: React.ReactNode
}

const TabWrapper: FC<TabWrapperProps> = ({ children }) => (
	<div className="bg-gray-800 p-1 rounded-full inline-flex">
		{children}
	</div>
)

interface TabButtonProps {
	active: boolean
	onClick: () => void
	children: React.ReactNode
}

const TabButton: FC<TabButtonProps> = ({ active, onClick, children }) => (
	<button
		onClick={onClick}
		className={`
			px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
			${active
				? 'bg-blue-600 text-white shadow-lg'
				: 'text-gray-400 hover:text-white hover:bg-gray-700'
			}
		`}
		aria-pressed={active}
	>
		{children}
	</button>
)

export default ProfilePostList

