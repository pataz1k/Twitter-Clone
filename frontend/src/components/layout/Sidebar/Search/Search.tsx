import { FC } from 'react'

import SearchField from '@/components/ui/search-filed/SearchField'

import SearchList from './SearchList/SearchList'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { isSuccess, data, handleSearch, searchTerm } = useSearch()

	return (
		<div className="relative">
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList posts={data.data} />}
		</div>
	)
}
export default Search
