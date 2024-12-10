import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { UseQueryResult, useQuery } from 'react-query'

import ProfileData from '@/components/Profile/ProfileData'
import ProfilePostList from '@/components/Profile/ProfilePostList'
import LinkButton from '@/components/ui/LinkButton'
import NotAuth from '@/components/ui/NotAuth'
import ProfileSkeleton from '@/components/ui/ProfileSkeleton/ProfileSkeleton'

import { IProfile } from '@/shared/types/profile.types'

import { LinkButtonColor } from '@/constants/linkButtonColor.enum'
import { UserService } from '@/services/user.service'
import useUserStore from '@/stores/user.store'
import Meta from '@/utils/meta/Meta'

interface IProfileResponse {
	success: boolean
	data: IProfile
}
interface ApiError {
	response?: {
		status: number
	}
}

const UserPage: FC = () => {
	const router = useRouter()

	const { isAuth, accessToken, username } = useUserStore()

	useEffect(() => {
		if (isAuth && username === router.query.username) {
			router.replace('/profile')
		}
	}, [username, router.query.username, isAuth])

	const {
		isSuccess,
		isLoading,
		isError,
		error,
		data,
		refetch,
	}: UseQueryResult<IProfileResponse, ApiError> = useQuery(
		['get user profile'],
		() => UserService.getUser(accessToken, router.query.username?.toString()!),
		{
			select: ({ data }: { data: IProfileResponse }) => data,
			enabled: isAuth && router.query.username !== undefined,
			retry: false,
		}
	)

	if (!isAuth) {
		return <NotAuth />
	}

	if (isLoading) return <ProfileSkeleton />

	if (isError && error?.response?.status === 404) {
		return (
			<div className="flex flex-col items-center justify-center">
				<p>User Not found</p>{' '}
				<LinkButton
					color={LinkButtonColor.PRIMARY}
					text="Go to Main Page"
					href="/"
				/>
			</div>
		)
	}

	if (!isSuccess || !data) {
		return null
	}

	return (
		<Meta
			title={`Profile ${data?.data.username}`}
			description={`Profile ${data?.data.username} ,Followers: ${data?.data.followersCount}, Following: ${data?.data.followingCount}`}
		>
			<>
				<ProfileData
					profile={data?.data}
					canFollow={true}
					refetchProfile={refetch}
					token={accessToken}
				/>
				<ProfilePostList profile={data?.data!} refetchPosts={refetch} />
			</>
		</Meta>
	)
}
export default UserPage
