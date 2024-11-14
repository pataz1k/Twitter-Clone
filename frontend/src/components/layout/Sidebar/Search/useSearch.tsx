import { useDebounce } from '@uidotdev/usehooks'
import { ChangeEvent, FC, useContext, useState } from 'react'
import { useQuery } from 'react-query'

import { AuthContext } from '@/providers/AuthProvider'

import { PostService } from '@/services/post.service'
import { UserService } from '@/services/user.service'

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const { isAuth, accessToken } = useContext(AuthContext)

	const debouncedSearch = useDebounce(searchTerm, 500)

	const { isSuccess: isSuccessPosts, data: dataPosts } = useQuery(
		['search tags list', debouncedSearch],
		() => PostService.findByCaption(searchTerm),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch,
		}
	)

	const { isSuccess: isSuccessUsers, data: dataUsers } = useQuery(
		['search users list', debouncedSearch],
		() => UserService.findByUsername(searchTerm, accessToken),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch && isAuth,
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return {
		isSuccessPosts: isSuccessPosts,
		dataPosts: dataPosts,
		isSuccessUsers: isSuccessUsers || false,
		dataUsers: dataUsers || [],
		handleSearch,
		searchTerm,
	}
}
