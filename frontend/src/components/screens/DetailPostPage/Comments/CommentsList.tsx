import { FC } from 'react'
import toast from 'react-hot-toast'

import { IComment } from '@/shared/types/comment.types'

import CommentsForm from './CommentForm'
import CommentsItem from './CommentsItem'
import { PostService } from '@/services/post.service'
import useUserStore from '@/stores/user.store'

interface ICommentsList {
	comments: IComment[]
	postId: string
	refetchPosts: () => void
}

const CommentsList: FC<ICommentsList> = ({
	comments,
	postId,
	refetchPosts,
}) => {
	const { accessToken } = useUserStore()

	const addCommentHandler = (data: { text: string }) => {
		PostService.addComment(postId, data.text, accessToken)
			.then((res) => {
				if (res.status === 200) {
					toast.success('Comment added successfully')
					refetchPosts()
				}
			})
			.catch((err) => console.log(err))
	}

	return (
		<div className="py-4 rounded-lg">
			<h2 className="text-xl font-bold text-gray-100 mb-4">Comments</h2>

			<div className="mb-6">
				<CommentsForm onSubmit={addCommentHandler} />
			</div>

			<div className="space-y-4">
				{comments.length === 0 ? (
					<p className="text-gray-400">
						No comments yet. Be the first to comment!
					</p>
				) : (
					[...comments]
						.reverse()
						.map((comment) => <CommentsItem key={comment._id} {...comment} />)
				)}
			</div>
		</div>
	)
}

export default CommentsList
