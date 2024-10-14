import cn from 'classnames'
import { FC, useState } from 'react'

import MaterialIcon from '../MaterialIcons'

import classes from './CreatePost.module.scss'

const CreatePost: FC = () => {
	const [inputValue, setInputValue] = useState('')
	const [lettersCount, setLettersCount] = useState(0)

	const handleChange = (event) => {
		setLettersCount(event.target.value.length)
		setInputValue(event.target.value)
		adjustHeight(event.target)
	}

	const adjustHeight = (element) => {
		element.style.height = 'auto'
		element.style.height = `${element.scrollHeight}px`
	}
	return (
		<div className={classes.wrap}>
			<div>Profile Data</div>
			<textarea
				name="create post"
				className={classes.input}
				draggable="false"
				placeholder="What's happening?"
				value={inputValue}
				onChange={handleChange}
				contentEditable
				maxLength={240}
			/>
			<div className={classes.info}>
				<div className={classes.additionalButtons}>
					<button>
						<MaterialIcon name="MdOutlineImage" />
					</button>
					<button>
						<MaterialIcon name="MdOutlineGifBox" />
					</button>
					<button>
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
					<button className="bg-blue-500 p-2 px-4 rounded-2xl hover:bg-blue-700 transition-colors">
						Tweet
					</button>
				</div>
			</div>
		</div>
	)
}
export default CreatePost
