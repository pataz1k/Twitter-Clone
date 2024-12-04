import { IComment } from "@/shared/types/comment.types"
import { FC } from "react"
import CommentsItem from "./CommentsItem"

interface ICommentsList {
  comments: IComment[]
}

const CommentsList: FC<ICommentsList> = ({ comments }) => {
  return (
    <div className=" p-4 rounded-lg ">
      <h2 className="text-xl font-bold text-gray-100 mb-4">Comments</h2>
      
      <div className="mb-6">
        {/* Placeholder for CommentsForm */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400">Comments Form (to be implemented)</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-400">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <CommentsItem key={comment._id} {...comment} />
          ))
        )}
      </div>
    </div>
  )
}

export default CommentsList

