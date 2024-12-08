import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import useUserStore from '@/stores/user.store'

interface IFormInput {
	text: string
}

interface ICommentsForm {
	onSubmit: (data: IFormInput) => void
}

const CommentsForm: FC<ICommentsForm> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInput>()
	const { avatar } = useUserStore()

	const onSubmitHandler: SubmitHandler<IFormInput> = (data) => {
		onSubmit(data)
		reset()
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmitHandler)}
			className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-lg"
		>
			<div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
				<img
					src={avatar}
					alt="User Avatar"
					className="h-full w-full object-cover"
				/>
			</div>
			<div className="flex-grow">
				<input
					type="text"
					{...register('text', { required: 'Comment is required' })}
					className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
					placeholder="Post your reply"
				/>
				{errors.text && (
					<p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
				)}
			</div>
			<button
				type="submit"
				className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium rounded-md transition-colors duration-200"
			>
				Reply
			</button>
		</form>
	)
}

export default CommentsForm
