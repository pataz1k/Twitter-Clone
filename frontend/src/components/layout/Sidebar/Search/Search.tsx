import { AnimatePresence, motion } from 'motion/react'
import { FC } from 'react'

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
	return (
		<div className="relative ">
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			<AnimatePresence>
				{displayBorder && (
					<motion.div
						initial={{ opacity: 0, transform: 'translateY(10px)' }}
						animate={{ opacity: 1, transform: 'translateY(0)' }}
						exit={{ transform: 'translateY(10px)', opacity: 0 }}
						className="absolute w-full bg-gray-950 border rounded-xl border-zinc-700 p-5 mt-2"
					>
						{isSuccessPosts && (
							<>
								<h1 className="border-b-[1px] border-zinc-700 pb-2 mb-2 text-center font-bold">
									Posts
								</h1>
								<PostsList posts={dataPosts.data} />
							</>
						)}

						{isSuccessUsers && (
							<>
								<h1 className="border-b-[1px] border-zinc-700 pb-2 mb-2 text-center font-bold">
									Users
								</h1>
								<UsersList users={dataUsers.data} />
							</>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
export default Search
