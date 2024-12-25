import { FC } from 'react'
import { useQuery } from 'react-query'

import ProfileData from '@/components/Profile/ProfileData'
import ProfilePostList from '@/components/Profile/ProfilePostList'
import NotAuth from '@/components/ui/NotAuth'
import ProfileError from '@/components/ui/ProfileError'
import ProfileSkeleton from '@/components/ui/ProfileSkeleton/ProfileSkeleton'

import { IProfile } from '@/shared/types/profile.types'

import { AuthService } from '@/services/auth.service'
import useUserStore from '@/stores/user.store'
import Meta from '@/utils/meta/Meta'

interface IProfileResponse {
	success: boolean
	data: IProfile
}

const Profile: FC = () => {
	const { isAuth, accessToken, username } = useUserStore()

	const { isSuccess, isError, isLoading, data, refetch } = useQuery(
		[`get ${username} profile`],
		() => AuthService.me(accessToken),
		{ select: ({ data }: { data: IProfileResponse }) => data, enabled: isAuth }
	)

	if (!isAuth) {
		return <NotAuth />
	}

	if (isError) {
		return <ProfileError refetch={refetch} />
	}

	if (isLoading) {
		return <ProfileSkeleton />
	}

	if (isSuccess && data) {
		return (
			<Meta title={`Profile ${data.data.username}`}>
				<ProfileData profile={data.data} refetchProfile={refetch} />
				<ProfilePostList profile={data.data} refetchPosts={refetch} />
			</Meta>
		)
	}
}
export default Profile
