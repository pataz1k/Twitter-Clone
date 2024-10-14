import Link from 'next/link'
import { FC } from 'react'

import { IPost } from '@/shared/types/post.types'

import TagsList from '../TagsList/TagsList'

import styles from './SearchList.module.scss'
import { getPostUrl } from '@/config/url.config'

const SearchList: FC<{ posts: IPost[] }> = ({ posts }) => {
	return (
		<div className={styles.container}>
			{posts.length ? (
				posts.map((post) => (
					<Link
						key={post._id}
						href={getPostUrl(post._id)}
						className={styles.item}
					>
						<span>{post.caption}</span>
						<TagsList tags={post.tags} />
					</Link>
				))
			) : (
				<div>Posts Not Found</div>
			)}
		</div>
	)
}
export default SearchList
