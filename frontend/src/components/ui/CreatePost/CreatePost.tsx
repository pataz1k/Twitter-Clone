import { EmojiClickData } from 'emoji-picker-react'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import getCaretCoordinates from 'textarea-caret'

import { ITag } from '@/shared/types/post.types'

import EmojiModal from '../EmojiModal'
import MaterialIcon from '../MaterialIcons'
import ProfileItem from '../ProfileItem/ProfileItem'
import TagsAutocomplete from '../TagsAutocomplete'
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
export interface CaretCoordinates {
	x: number
	y: number
}

interface ITagsResponse {
	success: boolean
	data: ITag[]
}

const CreatePost: FC<ICreatePost> = ({
	refetchPosts,
	openImageUpload,
	images,
}) => {
	const { accessToken, username, avatar, accountID, isAuth } = useUserStore()

	const [isEmojiOpen, setIsEmojiOpen] = useState(false)
	const [hashtags, setHashtags] = useState<string[]>([])
	const [caretPosition, setCaretPosition] = useState<CaretCoordinates>({
		x: 0,
		y: 0,
	})
	const [isSelected, setIsSelected] = useState(false)
	const [currentHashtagInput, setCurrentHashtagInput] = useState('')

	const buttonRef = useRef<HTMLButtonElement>(null)
	const textareaRef: MutableRefObject<HTMLTextAreaElement | null> =
		useRef<HTMLTextAreaElement | null>(null)

	const closeEmojiModal = () => setIsEmojiOpen(false)
	const { register, handleSubmit, reset, watch, setValue, trigger } =
		useForm<Inputs>()

	const caption = watch('caption', '')

	const { isSuccess, isLoading, data, refetch } = useQuery(
		['get tags'],
		() => PostService.getTags(),
		{
			select: ({ data }: { data: ITagsResponse }) => data,
			enabled: isAuth,
		}
	)

	const handleSelect = () => {
		if (textareaRef.current) {
			const { left, top } = getCaretCoordinates(
				textareaRef.current,
				textareaRef.current.selectionEnd
			)
			setCaretPosition({ x: left, y: top })
			const currentPosition = textareaRef.current.selectionEnd
			const lastHashtagIndex = caption.lastIndexOf('#', currentPosition - 1)
			if (lastHashtagIndex !== -1 && lastHashtagIndex < currentPosition) {
				setCurrentHashtagInput(
					caption.slice(lastHashtagIndex + 1, currentPosition)
				)
				setIsSelected(true)
			} else {
				setIsSelected(false)
			}
		}
	}

	const extractHashtags = (text: string) => {
		const regex = /#\w+ /g

		const extractedHashtags = text.match(regex) || []

		const newHashtags = extractedHashtags.filter(
			(tag) => !hashtags.includes(tag.trim())
		)
		newHashtags.forEach((tag) => {
			setHashtags((prevHashtags) => [...prevHashtags, tag.trim()])
		})

		return text.replace(regex, '')
	}

	const removeHashtag = (tagToRemove: string) => {
		setHashtags((prevHashtags) =>
			prevHashtags.filter((tag) => tag !== tagToRemove)
		)
	}

	const addEmoji = (emoji: EmojiClickData) => {
		setValue('caption', `${caption}${emoji.emoji}`, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		})
		trigger('caption')
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

	const handleAddTag = (tag: string) => {
		setValue(
			'caption',
			`${caption.substring(0, caption.indexOf('#'))}#${tag} `,
			{
				shouldValidate: true,
				shouldDirty: true,
				shouldTouch: true,
			}
		)
		trigger('caption')
	}
	const handleCloseTags = () => {
		setIsSelected(false)
	}

	return (
		<div className={styles.wrap}>
			{isSelected && (
				<TagsAutocomplete
					onAddTag={handleAddTag}
					position={caretPosition}
					handleCloseTags={handleCloseTags}
					tags={data?.data || []}
					currentInput={currentHashtagInput}
				/>
			)}

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
					ref={(e) => {
						const { ref } = register('caption', {
							required: { value: true, message: 'Caption is required' },
						})
						if (typeof ref === 'function') {
							ref(e)
						}
						textareaRef.current = e
					}}
					onSelect={handleSelect}
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
