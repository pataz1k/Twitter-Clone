import { useRouter } from 'next/router'
import { FC } from 'react'

import Meta from '@/utils/meta/Meta'
import { useQuery } from 'react-query'
import { PostService } from '@/services/post.service'
import { IPost } from '@/shared/types/post.types'
import Heading from '@/components/ui/Heading'
import PostsList from '@/components/PostsList/PostsList'

interface IPostsByTagsResponse {
	success: boolean
	data: IPost[]
}

const index: FC = () => {
	const router = useRouter()

	const { isSuccess, data,isLoading, refetch } = useQuery(
		['get posts with tag'],
		() => PostService.getPostsByTag(router.query.tag as string),
		{ select: ({ data }: { data: IPostsByTagsResponse }) => data, enabled: router.query.tag !== undefined }
	)
	if (isLoading) {
		return <h1>Loading...</h1>
	}
	
	if (isSuccess) {
		return (
			<div>
				<Meta title={`Posts with tag - #${router.query.tag}`}>
					<Heading title={`Posts with tag - #${router.query.tag}`} className='mb-5'/>
					<PostsList posts={data?.data!} refetchPosts={refetch}/>
				</Meta>
			</div>
		)
	}


}

export default index
