import { FC, useContext } from 'react'
import { useQuery } from 'react-query'

import { AuthContext } from '@/providers/AuthProvider'

import { IProfile } from '@/shared/types/profile.types'

import ProfileData from './ProfileData'
import ProfilePostList from './ProfilePostList'
import { AuthService } from '@/services/auth.service'

interface IProfileResponse {
	success: boolean
	data: IProfile
}

const Profile: FC = () => {
	const { isAuth, accessToken, updateAuthStatus } = useContext(AuthContext)

	const { isSuccess, data, refetch } = useQuery(
		['get user profile'],
		() => AuthService.me(accessToken),
		{ select: ({ data }: { data: IProfileResponse }) => data, enabled: isAuth }
	)
	console.log(data)

	return (
		<>
			{isSuccess ? (
				<>
					<ProfileData profile={data?.data} />
					<ProfilePostList profile={data?.data} refetchPosts={refetch} />
				</>
			) : (
				<h1>You aren't auth.</h1>
			)}
		</>
	)
}
export default Profile
