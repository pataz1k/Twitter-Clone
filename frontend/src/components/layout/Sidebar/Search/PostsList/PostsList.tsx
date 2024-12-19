import Link from 'next/link'
import { FC } from 'react'

import { IPost } from '@/shared/types/post.types'

import TagsList from '../../../../ui/TagsList/TagsList'

import { getPostUrl } from '@/config/url.config'

const PostsList: FC<{ posts: IPost[] }> = ({ posts }) => {
	return (
		<>
			{posts.length ? (
				posts.map((post) => (
					<Link
						key={post._id}
						href={getPostUrl(post._id)}
						className="rounded-xl flex flex-col items-start py-3 pl-1 relative hover:bg-gray-900 transition-colors"
					>
						<span>{post.caption}</span>
						<TagsList tags={post.tags} />
					</Link>
				))
			) : (
				<div>Posts Not Found</div>
			)}
		</>
	)
}
export default PostsList
