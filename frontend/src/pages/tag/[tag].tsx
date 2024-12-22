import { useRouter } from 'next/router'
import { FC } from 'react'
import { useQuery } from 'react-query'

import PostsList from '@/components/PostsList/PostsList'
import Heading from '@/components/ui/Heading'

import { IPost } from '@/shared/types/post.types'

import { PostService } from '@/services/post.service'
import Meta from '@/utils/meta/Meta'

interface IPostsByTagsResponse {
	success: boolean
	data: IPost[]
}

const TagPage: FC = () => {
	const router = useRouter()
	const tag = router.query.tag as string

	const { isSuccess, data, isLoading, refetch } = useQuery(
		['get posts with tag', tag],
		() => PostService.getPostsByTag(tag),
		{
			select: ({ data }: { data: IPostsByTagsResponse }) => data,
			enabled: !!tag,
		}
	)

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	if (isSuccess && data) {
		return (
			<Meta title={`Posts with tag - #${tag}`}>
				<div>
					<Heading title={`Posts with tag - #${tag}`} className="mb-5" />
					<PostsList posts={data.data} refetchPosts={refetch} />
				</div>
			</Meta>
		)
	}

	return null
}

export default TagPage
