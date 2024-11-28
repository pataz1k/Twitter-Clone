import EmojiPicker, {
	EmojiClickData,
	EmojiStyle,
	Theme,
} from 'emoji-picker-react'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'

import { AuthContext } from '@/providers/AuthProvider'

import { IProfile } from '@/shared/types/profile.types'

import MaterialIcon from '../MaterialIcons'
import ProfileItem from '../ProfileItem/ProfileItem'
import ProfileItemSkeleton from '../ProfileItem/ProfileItemSkeleton'

import classes from './CreatePost.module.scss'
import { AuthService } from '@/services/auth.service'
import { PostService } from '@/services/post.service'

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
	const { isAuth, accessToken, expireAuthStatus } = useContext(AuthContext)
	const [isEmojiOpen, setIsEmojiOpen] = useState(false)
	const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 })

	let previousScrollY = window.scrollY

	const { register, handleSubmit, reset, watch, setValue, trigger } =
		useForm<Inputs>()

	const caption = watch('caption', '')
	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect()
			setButtonPosition({ top: rect.bottom, left: rect.left })
		}
	}, [isEmojiOpen])

	const { isSuccess, isLoading, isError, data } = useQuery(
		['get user profile'],
		() => AuthService.me(accessToken),
		{ select: ({ data }: { data: IProfileResponse }) => data, enabled: isAuth }
	)
	if (isError) {
		expireAuthStatus()
	}

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

	const adjustHeight = (element: HTMLTextAreaElement) => {
		element.style.height = 'auto'
		element.style.height = `${element.scrollHeight}px`
	}

	window.addEventListener('scroll', () => {
		if (window.scrollY !== previousScrollY) {
			if (isEmojiOpen) {
				setIsEmojiOpen(false)
			}
			previousScrollY = window.scrollY
		}
	})

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
		<div className={classes.wrap}>
			<div
				className="fixed z-50"
				style={{
					top: `${buttonPosition.top}px`,
					left: `${buttonPosition.left}px`,
				}}
			>
				<EmojiPicker
					theme={Theme.DARK}
					open={isEmojiOpen}
					onEmojiClick={addEmoji}
					emojiStyle={EmojiStyle.NATIVE}
					skinTonesDisabled={true}
				/>
			</div>
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
					className={classes.input}
					draggable="false"
					placeholder="What's happening?"
					maxLength={480}
					{...register('caption', {
						required: { value: true, message: 'Caption is required' },
					})}
				/>
				<div className={classes.info}>
					<div className={classes.additionalButtons}>
						<button onClick={openImageUpload} type="button">
							<MaterialIcon name="MdOutlineImage" />
						</button>
						<button type="button">
							<MaterialIcon name="MdOutlineGifBox" />
						</button>
						<button
							type="button"
							ref={buttonRef}
							onClick={() => setIsEmojiOpen(!isEmojiOpen)}
						>
							<MaterialIcon name="MdOutlineEmojiEmotions" />
						</button>
						<button type="button">
							<MaterialIcon name="MdOutlineLocationOn" />
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
