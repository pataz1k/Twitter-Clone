import { useClickAway } from '@uidotdev/usehooks'
import { FC, useEffect } from 'react'

import { ITag } from '@/shared/types/post.types'

import { CaretCoordinates } from './CreatePost/CreatePost'

interface ITagsAutocomplete {
	tags: ITag[]
	onAddTag: (tag: string) => void
	position: CaretCoordinates
	handleCloseTags: () => void
	currentInput: string
}

const TagsAutocomplete: FC<ITagsAutocomplete> = ({
	tags,
	onAddTag,
	position,
	handleCloseTags,
	currentInput,
}) => {
	const clickOutside = useClickAway<HTMLDivElement>(() => {
		handleCloseTags()
	})
	useEffect(() => {
		tags.filter((tag) =>
			tag.tag.toLowerCase().includes(currentInput.toLowerCase())
		).length === 0 && handleCloseTags()
	}, [currentInput, tags, handleCloseTags])

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="absolute rounded-md z-50 max-w-xs w-full"
			style={{ left: position.x, top: position.y + 80 }}
			ref={clickOutside}
		>
			<div className="w-full">
				<div className="flex flex-col gap-1 bg-gray-900 p-3 rounded-md shadow-lg border border-gray-700 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
					{tags
						.filter((tag) =>
							tag.tag.toLowerCase().includes(currentInput.toLowerCase())
						)
						.sort((a, b) => b.count - a.count)
						.map((tag) => (
							<button
								key={tag.tag}
								onClick={() => {
									const slicedTag = tag.tag.slice(1)
									onAddTag(slicedTag)
									handleCloseTags()
								}}
								className="flex justify-between items-center w-full px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-200 ease-in-out text-left"
							>
								<span className="text-sm text-white truncate">{tag.tag}</span>
								<span className="text-xs text-gray-400 ml-2 flex-shrink-0">
									{tag.count}
								</span>
							</button>
						))}
				</div>
			</div>
		</div>
	)
}

export default TagsAutocomplete
