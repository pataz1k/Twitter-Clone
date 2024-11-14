import { FC } from 'react'

import SearchField from '@/components/ui/search-filed/SearchField'

import PostsList from './PostsList/PostsList'
import UsersList from './Users/UsersList/UsersList'
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
		<div className="relative">
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{displayBorder && (
				<div className="border rounded-xl border-zinc-700 p-5">
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
				</div>
			)}
		</div>
	)
}
export default Search
