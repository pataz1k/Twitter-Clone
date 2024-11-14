import { useDebounce } from '@uidotdev/usehooks'
import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { UserService } from '@/services/user.service'

export const useSearchUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const { isSuccess, data } = useQuery(
		['search users list', debouncedSearch],
		() => UserService.findByUsername(searchTerm),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch,
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return {
		isSuccessUsers: isSuccess,
		dataUsers: data,
		handleSearchUsers: handleSearch,
		searchTermUsers: searchTerm,
	}
}
