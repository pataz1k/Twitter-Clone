import { FC, useContext } from 'react'
import { useQuery } from 'react-query'

import ProfileData from '@/components/Profile/ProfileData'
import ProfilePostList from '@/components/Profile/ProfilePostList'
import NotAuth from '@/components/ui/NotAuth'

import { AuthContext } from '@/providers/AuthProvider'

import { IProfile } from '@/shared/types/profile.types'

import { AuthService } from '@/services/auth.service'
import Meta from '@/utils/meta/Meta'

interface IProfileResponse {
	success: boolean
	data: IProfile
}

const Profile: FC = () => {
	const { isAuth, accessToken } = useContext(AuthContext)

	const { isSuccess, data, refetch } = useQuery(
		['get user profile'],
		() => AuthService.me(accessToken),
		{ select: ({ data }: { data: IProfileResponse }) => data, enabled: isAuth }
	)

	if (!isAuth) {
		return <NotAuth />
	}

	if (!isSuccess || !data) {
		return null
	}

	return (
		<Meta title={`Profile ${data.data.username}`}>
			<ProfileData profile={data.data} refetchProfile={refetch} />
			<ProfilePostList profile={data.data} refetchPosts={refetch} />
		</Meta>
	)
}
export default Profile
