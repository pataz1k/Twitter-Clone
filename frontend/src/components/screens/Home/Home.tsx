import Link from 'next/link'
import { FC, useContext } from 'react'
import { useQuery } from 'react-query'

import CreatePost from '@/components/ui/CreatePost/CreatePost'
import PostsList from '@/components/ui/PostsList/PostsList'

import { AuthContext } from '@/providers/AuthProvider'

import { PostService } from '@/services/post.service'

const Home: FC = () => {
	const { isAuth } = useContext(AuthContext)

	const { isSuccess, data, refetch } = useQuery(
		['get all posts'],
		() => PostService.getAll(),
		{ select: ({ data }) => data }
	)

	return (
		<div>
			{isAuth ? (
				<CreatePost />
			) : (
				<div className="flex justify-center gap-2 items-center p-5">
					<h1>You need to be log in to create new post.</h1>
					<Link
						href={'/auth'}
						className="bg-blue-500 p-2 px-4 rounded-2xl hover:bg-blue-700 transition-colors"
					>
						Log in
					</Link>
				</div>
			)}
			<div className="border-t border-gray-700 py-2">
				{isSuccess && <PostsList posts={data.data} refetchPosts={refetch} />}
			</div>
		</div>
	)
}
export default Home
