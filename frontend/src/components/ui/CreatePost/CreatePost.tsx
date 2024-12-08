import { EmojiClickData } from 'emoji-picker-react'
import { FC, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import EmojiModal from '../EmojiModal'
import MaterialIcon from '../MaterialIcons'
import ProfileItem from '../ProfileItem/ProfileItem'

import styles from './CreatePost.module.scss'
import { PostService } from '@/services/post.service'
import useUserStore from '@/stores/user.store'

interface ICreatePost {
	refetchPosts: () => void
	openImageUpload: () => void
	images: string[]
}

type Inputs = {
	caption: string
}

const CreatePost: FC<ICreatePost> = ({
	refetchPosts,
	openImageUpload,
	images,
}) => {
	const { isAuth, accessToken, username, avatar, accountID, isLoading } =
		useUserStore()
	const [isEmojiOpen, setIsEmojiOpen] = useState(false)
	const { register, handleSubmit, reset, watch, setValue, trigger } =
		useForm<Inputs>()
	const buttonRef = useRef<HTMLButtonElement>(null)
	const closeEmojiModal = () => setIsEmojiOpen(false)

	const caption = watch('caption', '')

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		PostService.createPost(accessToken, data.caption, images)
			.then((res) => {
				if (res.data.success) {
					toast.success('Post created successfully')
				}
			})
			.catch((err) => console.log(err))
			.finally(() => {
				refetchPosts()
				reset()
			})
	}

	const addEmoji = (emoji: EmojiClickData) => {
		setValue('caption', `${caption}${emoji.emoji}`, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		})
		trigger('caption')
	}

	return (
		<div className={styles.wrap}>
			<EmojiModal
				isOpen={isEmojiOpen}
				onClose={closeEmojiModal}
				buttonRef={buttonRef}
				onAddEmoji={addEmoji}
			/>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ProfileItem avatar={avatar} username={username} id={accountID} />
				<textarea
					className={styles.input}
					draggable="false"
					placeholder="What's happening?"
					maxLength={480}
					{...register('caption', {
						required: { value: true, message: 'Caption is required' },
					})}
				/>
				<div className={styles.info}>
					<div className={styles.additionalButtons}>
						<button onClick={openImageUpload} type="button">
							<MaterialIcon name="MdOutlineImage" />
						</button>
						<button
							type="button"
							ref={buttonRef}
							onClick={() => {
								if (!isEmojiOpen) {
									setIsEmojiOpen(true)
								}
							}}
						>
							<MaterialIcon name="MdOutlineEmojiEmotions" />
						</button>
					</div>
					<div className="flex gap-3 items-center">
						<button
							type="submit"
							className="bg-blue-500 p-2 px-4 rounded-2xl hover:bg-blue-700 transition-colors"
						>
							Tweet
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default CreatePost
