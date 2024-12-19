import { FC } from 'react'

import MaterialIcon from '../MaterialIcons'

interface ITagsList {
	tags: string[]
	onRemoveTag?: (tag: string) => void
}

const TagsList: FC<ITagsList> = ({ tags, onRemoveTag }) => {
	if (!tags.length) return null

	return (
		<ul className="my-3 flex flex-wrap gap-2 overflow-hidden">
			{tags.map((tag, index) => (
				<p
					key={index}
					className="hover:bg-blue-700 bg-blue-600 rounded-full px-2 text-sm truncate transition-colors flex items-center gap-1"
				>
					{tag}
					{onRemoveTag && (
						<button className="" onClick={() => onRemoveTag(tag)}>
							<MaterialIcon name="MdClose" />
						</button>
					)}
				</p>
			))}
		</ul>
	)
}

export default TagsList
