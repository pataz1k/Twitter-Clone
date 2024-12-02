import { EmojiClickData } from 'emoji-picker-react'
import { FC, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'

import { IProfile } from '@/shared/types/profile.types'

import EmojiModal from '../EmojiModal'
import MaterialIcon from '../MaterialIcons'
import ProfileItem from '../ProfileItem/ProfileItem'
import ProfileItemSkeleton from '../ProfileItem/ProfileItemSkeleton'

import styles from './CreatePost.module.scss'
import { AuthService } from '@/services/auth.service'
import { PostService } from '@/services/post.service'
import useUserStore from '@/stores/user.store'

interface IProfileResponse {
	success: boolean
	data: IProfile
}

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
	const { isAuth, accessToken } = useUserStore()
	const [isEmojiOpen, setIsEmojiOpen] = useState(false)
	const { register, handleSubmit, reset, watch, setValue, trigger } =
		useForm<Inputs>()
	const buttonRef = useRef<HTMLButtonElement>(null)
	const closeEmojiModal = () => setIsEmojiOpen(false)

	const caption = watch('caption', '')

	const { isSuccess, isLoading, data } = useQuery(
		['get user profile'],
		() => AuthService.me(accessToken),
		{ select: ({ data }: { data: IProfileResponse }) => data, enabled: isAuth }
	)

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

	if (!isSuccess || !data) {
		return null
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
				{isLoading && <ProfileItemSkeleton />}
				{isSuccess && (
					<ProfileItem
						avatar={data.data.avatar!}
						username={data.data.username!}
						id={data.data._id!}
					/>
				)}
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
						{/* <button type="button">
							<MaterialIcon name="MdOutlineGifBox" />
						</button> */}
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
						{/* <button type="button">
							<MaterialIcon name="MdOutlineLocationOn" />
						</button> */}
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
