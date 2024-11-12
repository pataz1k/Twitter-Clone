import { FC, useContext } from 'react'
import { useQuery } from 'react-query'

import NotAuth from '@/components/ui/NotAuth'

import { AuthContext } from '@/providers/AuthProvider'

import { IProfile } from '@/shared/types/profile.types'

import ProfileData from '../../ui/Profile/ProfileData'
import ProfilePostList from '../../ui/Profile/ProfilePostList'

import { AuthService } from '@/services/auth.service'

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

	return (
		<>
			{isSuccess ? (
				<>
					<ProfileData profile={data?.data} refetchProfile={refetch} />
					<ProfilePostList profile={data?.data} refetchPosts={refetch} />
				</>
			) : (
				<NotAuth />
			)}
		</>
	)
}
export default Profile
