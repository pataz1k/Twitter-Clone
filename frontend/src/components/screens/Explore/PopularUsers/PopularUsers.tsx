import Link from 'next/link'
import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'react-query'

import NotAuth from '@/components/ui/NotAuth'

import { IUser } from '@/shared/types/profile.types'

import ExploreContainer from '../ExploreContainer/ExploreContainer'

import { getUserPageUrl } from '@/config/url.config'
import { UserService } from '@/services/user.service'
import useUserStore from '@/stores/user.store'

interface IUsersResponse {
	success: boolean
	data: IUser[]
}

const PopularUsers: FC = () => {
	const { isAuth, accessToken } = useUserStore()

	const { isSuccess, data, isLoading, isError } = useQuery(
		['get popular users'],
		() => UserService.getAll(accessToken),
		{ select: ({ data }: { data: IUsersResponse }) => data, enabled: isAuth }
	)

	if (!isAuth) {
		return (
			<ExploreContainer heading="Most Popular Users">
				<div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
					<NotAuth />
				</div>
			</ExploreContainer>
		)
	}

	if (isError) {
		return (
			<ExploreContainer heading="Most Popular Users">
				<div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
					<h1 className="text-xl font-bold text-red-400">
						Error loading popular users.
					</h1>
				</div>
			</ExploreContainer>
		)
	}

	if (isLoading) {
		return (
			<ExploreContainer heading="Most Popular Users">
				<div className="space-y-3">
					{[...Array(8)].map((_, index) => (
						<Skeleton key={index} height={40} className="rounded-lg" />
					))}
				</div>
			</ExploreContainer>
		)
	}

	if (isSuccess) {
		return (
			<ExploreContainer heading="Most Popular Users">
				<div className="space-y-2">
					{data?.data
						.sort((a, b) => b.followersCount - a.followersCount)
						.slice(0, 8)
						.map((user, index) => (
							<Link
								key={index}
								href={getUserPageUrl(user.username)}
								className="flex justify-between items-center p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300 group"
							>
								<span className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
									{user.username}
								</span>
								<span className="text-sm bg-gray-700 px-2 py-1 rounded-full group-hover:bg-gray-600 transition-colors">
									{user.followersCount} Followers
								</span>
							</Link>
						))}
				</div>
			</ExploreContainer>
		)
	}

	return null
}

export default PopularUsers
