import { FC } from 'react'

import styles from './TagsList.module.scss'

const TagsList: FC<{ tags: string[] }> = ({ tags }) => {
	return (
		<div className={styles.container}>
			{tags.length !== 0 && tags.map((tag) => <p key={tag}>{tag}</p>)}
		</div>
	)
}
export default TagsList
