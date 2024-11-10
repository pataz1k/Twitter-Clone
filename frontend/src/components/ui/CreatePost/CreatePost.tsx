import cn from 'classnames'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import { FC, useContext, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'

import { AuthContext } from '@/providers/AuthProvider'

import { IProfile } from '@/shared/types/profile.types'

import MaterialIcon from '../MaterialIcons'
import ProfileItem from '../ProfileItem'

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
	const [lettersCount, setLettersCount] = useState(0)
	const { isAuth, accessToken } = useContext(AuthContext)
	const [isEmojiOpen, setIsEmojiOpen] = useState(false)
	const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 })

	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect()
			setButtonPosition({ top: rect.bottom, left: rect.left })
		}
	}, [isEmojiOpen])

	const { isSuccess, data } = useQuery(
		['get user profile'],
		() => AuthService.me(accessToken),
		{ select: ({ data }: { data: IProfileResponse }) => data, enabled: isAuth }
	)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Inputs>()
	const onSubmit = (data) => {
		PostService.createPost(accessToken, data.caption, images)
			.then((res) => console.log(res))
			.catch((err) => console.log(err))
			.finally(() => {
				refetchPosts()
				reset()
			})
	}

	const adjustHeight = (element) => {
		element.style.height = 'auto'
		element.style.height = `${element.scrollHeight}px`
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
				<EmojiPicker theme={Theme.DARK} open={isEmojiOpen} />
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ProfileItem
					avatar={data?.data.avatar!}
					username={data?.data.username!}
					id={data?.data._id!}
				/>
				<textarea
					className={classes.input}
					draggable="false"
					placeholder="What's happening?"
					maxLength={240}
					{...register('caption', {
						required: { value: true, message: 'Caption is required' },
						onChange: (event) => {
							setLettersCount(event.target.value.length)
							adjustHeight(event.target)
						},
					})}
				/>
				<div className={classes.info}>
					<div className={classes.additionalButtons}>
						<button onClick={openImageUpload}>
							<MaterialIcon name="MdOutlineImage" />
						</button>
						<button>
							<MaterialIcon name="MdOutlineGifBox" />
						</button>
						<button
							ref={buttonRef}
							onClick={() => setIsEmojiOpen(!isEmojiOpen)}
						>
							<MaterialIcon name="MdOutlineEmojiEmotions" />
						</button>
						<button>
							<MaterialIcon name="MdOutlineLocationOn" />
						</button>
					</div>
					<div className="flex gap-3 items-center">
						<p
							className={cn('p-2 px-4 rounded-2xl transition-colors', {
								'bg-blue-500': lettersCount <= 180,
								'bg-red-500': lettersCount === 240,
								'bg-orange-500': lettersCount >= 180,
							})}
						>
							{lettersCount} / 240
						</p>
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
