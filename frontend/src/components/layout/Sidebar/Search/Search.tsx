import { useClickAway } from '@uidotdev/usehooks'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, useState } from 'react'

import SearchField from '@/components/ui/search-filed/SearchField'

import PostsList from './PostsList/PostsList'
import UsersList from './UsersList/UsersList'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const {
		dataPosts,
		dataUsers,
		isSuccessPosts,
		isSuccessUsers,
		handleSearch,
		searchTerm,
	} = useSearch()

	const displayBorder = isSuccessPosts || isSuccessUsers
	const [showResults, setShowResults] = useState(true)
	const clickOutside = useClickAway<HTMLDivElement>(() => {
		setShowResults(false)
	})

	return (
		<div className="relative" ref={clickOutside}>
			<SearchField
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				handleSelect={setShowResults}
			/>
			<AnimatePresence>
				{displayBorder && showResults && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						className="absolute w-full bg-gray-900 border rounded-lg border-gray-800 p-4 mt-2 shadow-lg"
					>
						{isSuccessPosts && (
							<div className="mb-4">
								<h2 className="text-lg font-semibold text-white border-b border-gray-800 pb-2 mb-3">
									Posts
								</h2>
								<PostsList posts={dataPosts.data} />
							</div>
						)}

						{isSuccessUsers && (
							<div>
								<h2 className="text-lg font-semibold text-white border-b border-gray-800 pb-2 mb-3">
									Users
								</h2>
								<UsersList users={dataUsers.data} />
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Search
