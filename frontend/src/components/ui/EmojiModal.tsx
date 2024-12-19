import { useClickAway } from '@uidotdev/usehooks'
import EmojiPicker, {
	EmojiClickData,
	EmojiStyle,
	Theme,
} from 'emoji-picker-react'
import { FC, RefObject, useEffect, useState } from 'react'

interface IEmojiModal {
	isOpen: boolean
	onClose: () => void
	buttonRef: RefObject<HTMLButtonElement>
	onAddEmoji: (emoji: EmojiClickData) => void
}

const EmojiModal: FC<IEmojiModal> = ({
	isOpen,
	onClose,
	buttonRef,
	onAddEmoji,
}) => {
	const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 })
	let previousScrollY = window.scrollY

	window.addEventListener('scroll', () => {
		if (window.scrollY !== previousScrollY) {
			if (isOpen) {
				onClose()
			}
			previousScrollY = window.scrollY
		}
	})
	const emojiOutsideRef = useClickAway<HTMLDivElement>(() => onClose())

	useEffect(() => {
		if (buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect()
			setButtonPosition({ top: rect.bottom, left: rect.left })
		}
	}, [isOpen, buttonRef])
	return (
		<div
			ref={emojiOutsideRef}
			className="fixed z-50"
			style={{
				top: `${buttonPosition.top}px`,
				left: `${buttonPosition.left}px`,
			}}
		>
			<EmojiPicker
				theme={Theme.DARK}
				open={isOpen}
				onEmojiClick={onAddEmoji}
				emojiStyle={EmojiStyle.NATIVE}
				skinTonesDisabled={true}
			/>
		</div>
	)
}
export default EmojiModal
