import { FC } from 'react'

import { IPost } from '@/shared/types/post.types'

import PostItem from './PostItem'
import styles from './PostsList.module.scss'

interface IPostsList {
	posts: IPost[] | []
	refetchPosts: () => void
}

const PostsList: FC<IPostsList> = ({ posts, refetchPosts }) => {
	return (
		<div className={styles.wrap}>
			{posts.length ? (
				[...posts]
					.reverse()
					.map((item: IPost) => (
						<PostItem key={item._id} post={item} refetchPosts={refetchPosts} />
					))
			) : (
				<div>Posts not found</div>
			)}
		</div>
	)
}
export default PostsList
