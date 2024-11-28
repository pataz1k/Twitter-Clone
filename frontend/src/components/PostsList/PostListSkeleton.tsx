import { FC } from 'react'

import PostSkeleton from '../ui/PostSkeleton'

const PostListSkeleton: FC = () => {
	const postsList = [1, 2, 3, 4, 5]
	return (
		<div>
			{postsList.map((_, index) => (
				<PostSkeleton key={index} />
			))}
		</div>
	)
}
export default PostListSkeleton
