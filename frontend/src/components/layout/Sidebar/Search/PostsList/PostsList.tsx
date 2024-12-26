import Link from 'next/link'
import { FC, useState } from 'react'

import TagsList from '@/components/ui/TagsList/TagsList'

import { IPost } from '@/shared/types/post.types'

import { getPostUrl } from '@/config/url.config'

const PostsList: FC<{ posts: IPost[] }> = ({ posts }) => {
	const [showAll, setShowAll] = useState(false)
	const displayPosts = showAll ? posts : posts.slice(0, 4)

	return (
		<div className="space-y-2">
			{posts.length ? (
				<>
					{displayPosts.map((post) => (
						<Link
							key={post._id}
							href={getPostUrl(post._id)}
							className="block rounded-lg p-3 hover:bg-gray-700 transition-colors duration-200"
						>
							<h3 className="text-white font-medium mb-1 line-clamp-2">
								{post.caption}
							</h3>
							<TagsList tags={post.tags} />
						</Link>
					))}
					{posts.length > 4 && (
						<button
							className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium"
							onClick={() => setShowAll(!showAll)}
						>
							{showAll ? 'Show less' : `Show ${posts.length - 4} more`}
						</button>
					)}
				</>
			) : (
				<p className="text-gray-400 text-sm">No posts found</p>
			)}
		</div>
	)
}

export default PostsList
