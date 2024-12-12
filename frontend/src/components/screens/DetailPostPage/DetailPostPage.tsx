import { useRouter } from 'next/router'
import { FC } from 'react'
import { useQuery } from 'react-query'

import PostItem from '@/components/PostsList/PostItem'
import Heading from '@/components/ui/Heading'

import { IPost } from '@/shared/types/post.types'

import CommentsList from './Comments/CommentsList'
import { PostService } from '@/services/post.service'
import useUserStore from '@/stores/user.store'
import Meta from '@/utils/meta/Meta'

interface IPostResponse {
	success: boolean
	data: IPost
}

const DetailPostPage: FC = () => {
	const router = useRouter()
	const { accessToken, isAuth } = useUserStore()

	const { isSuccess, isLoading, data, refetch } = useQuery(
		['get detail post', router.query.id],
		() => PostService.getPostById(router.query.id as string, accessToken),
		{
			select: ({ data }: { data: IPostResponse }) => data,
			enabled: isAuth && router.query.id !== undefined,
		}
	)

	console.log('API Response:', data)

	if (!isAuth) {
		return <h1>Please log in to view this post</h1>
	}

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	if (!isSuccess || !data?.data) {
		return <h1>Error loading post. Please try again later.</h1>
	}

	const post = data.data
	const username = post.user?.username || 'Unknown User'

	return (
		<div>
			<Meta title={`Post from ${username}`}>
				<Heading title={`Post from ${username}`} className="mb-4" />
				<PostItem post={post} refetchPosts={refetch} isDetail />
				<CommentsList
					comments={post.comments || []}
					postId={post._id}
					refetchPosts={refetch}
				/>
			</Meta>
		</div>
	)
}

export default DetailPostPage
