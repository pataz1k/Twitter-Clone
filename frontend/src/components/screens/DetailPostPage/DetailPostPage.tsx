import PostItem from '@/components/PostsList/PostItem'
import Heading from '@/components/ui/Heading'
import { PostService } from '@/services/post.service'
import { IPost } from '@/shared/types/post.types'
import useUserStore from '@/stores/user.store'
import Meta from '@/utils/meta/Meta'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useQuery } from 'react-query'
import CommentsList from './Comments/CommentsList'

interface IPostResponse {
  success: boolean
  data: IPost
}

// PostService.addComment(router.query.id as string,"1 more comment",accessToken).then(res => console.log(res)).catch(err => console.log(err))

const DetailPostPage:FC = () => {

  const router = useRouter()
  const { accessToken, isAuth} = useUserStore()

  const { isSuccess, isLoading,data, refetch } = useQuery(
		['get user dialogs'],
		() => PostService.getPostById(router.query.id as string,accessToken),
		{
			select: ({ data }: { data: IPostResponse }) => data,
			enabled: isAuth && router.query.id !== undefined,
		}
	)

  console.log(data?.data)

  if (!isSuccess || isLoading) {
    return <h1>Loading...</h1>
  }
  
  if (!data?.data) {
    return null
  }

  return (
    <div>
      <Meta title={`Post from ${data.data.user.username}`}>
      <Heading title={`Post from ${data.data.user.username}`}  className='mb-4'/>
      <PostItem post={data?.data!} refetchPosts={refetch}/>
      <CommentsList comments={data.data.comments} />
      </Meta>

    </div>
  )
}

export default DetailPostPage