import { motion } from 'motion/react'
import { FC } from 'react'

import { IPost } from '@/shared/types/post.types'

import PostItem from './PostItem'

interface IPostsList {
	posts: IPost[] | []
	refetchPosts: () => void
}

const PostsList: FC<IPostsList> = ({ posts, refetchPosts }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className="space-y-4"
		>
			{posts.length ? (
				[...posts]
					.reverse()
					.map((item: IPost) => (
						<PostItem key={item._id} post={item} refetchPosts={refetchPosts} />
					))
			) : (
				<div className="bg-gray-900 rounded-lg p-6 text-center text-gray-400">
					<p className="text-lg font-semibold">No posts found</p>
				</div>
			)}
		</motion.div>
	)
}

export default PostsList
