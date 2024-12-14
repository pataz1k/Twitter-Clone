import { EmojiClickData } from 'emoji-picker-react'
import { FC, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import EmojiModal from '../EmojiModal'
import MaterialIcon from '../MaterialIcons'
import ProfileItem from '../ProfileItem/ProfileItem'
import TagsList from '../TagsList/TagsList'

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
	const { accessToken, username, avatar, accountID } = useUserStore()
	const [isEmojiOpen, setIsEmojiOpen] = useState(false)
	const [hashtags, setHashtags] = useState<string[]>([])
	const { register, handleSubmit, reset, watch, setValue, trigger } =
		useForm<Inputs>()
	const buttonRef = useRef<HTMLButtonElement>(null)
	const closeEmojiModal = () => setIsEmojiOpen(false)

	const caption = watch('caption', '')

	function extractHashtags(text: string) {
		const regex = /#\w+ /g
		const extractedHashtags = text.match(regex) || []
		const newHashtags = extractedHashtags.filter(
			(tag) => !hashtags.includes(tag)
		)
		newHashtags.forEach((tag) => {
			setHashtags((prevHashtags) => [...prevHashtags, tag.trim()])
		})

		return text.replace(regex, '')
	}

	useEffect(() => {
		const extractedText = extractHashtags(caption)
		setValue('caption', extractedText, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		})
		trigger('caption')
	}, [caption, setValue, trigger])

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const fullCaption = `${data.caption}`

		PostService.createPost(accessToken, fullCaption, images, hashtags)
			.then((res) => {
				if (res.data.success) {
					toast.success('Post created successfully')
				}
			})
			.catch((err) => console.log(err))
			.finally(() => {
				refetchPosts()
				reset()
				setHashtags([])
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

	const removeHashtag = (tagToRemove: string) => {
		setHashtags((prevHashtags) =>
			prevHashtags.filter((tag) => tag !== tagToRemove)
		)
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
				<TagsList tags={hashtags} onRemoveTag={removeHashtag} />
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
