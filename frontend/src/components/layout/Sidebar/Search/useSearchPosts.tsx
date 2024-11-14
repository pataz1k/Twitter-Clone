import { useDebounce } from '@uidotdev/usehooks'
import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { PostService } from '@/services/post.service'

export const useSearchPosts = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const { isSuccess, data } = useQuery(
		['search tags list', debouncedSearch],
		() => PostService.findByCaption(searchTerm),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch,
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return {
		isSuccessPosts: isSuccess,
		dataPosts: data,
		handleSearchPosts: handleSearch,
		searchTermPosts: searchTerm,
	}
}
