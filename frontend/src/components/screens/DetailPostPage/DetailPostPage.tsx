import { useRouter } from 'next/router'
import { FC } from 'react'
import { useQuery } from 'react-query'

import PostItem from '@/components/PostsList/PostItem'
import BackButton from '@/components/ui/BackButton/BackButton'
import Heading from '@/components/ui/Heading'

import { IPost } from '@/shared/types/post.types'

import CommentsList from './Comments/CommentsList'
import { PostService } from '@/services/post.service'
import useUserStore from '@/stores/user.store'
import Meta from '@/utils/meta/Meta'
import NotAuth from '@/components/ui/NotAuth'

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


	if (!isAuth) {
		return <NotAuth/>
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
		<main className="flex-grow">
			<Meta title={`Post from ${username}`}>
				<header className="flex gap-4 align-middle mb-4 mt-2">
					<BackButton />
					<Heading title={`Post from ${username}`} />
				</header>
				<PostItem post={post} refetchPosts={refetch} isDetail />
				<CommentsList
					comments={post.comments || []}
					postId={post._id}
					refetchPosts={refetch}
				/>
			</Meta>
		</main>
	)
}

export default DetailPostPage
