import { FC, useContext } from 'react'
import { useQuery } from 'react-query'

import { AuthContext } from '@/providers/AuthProvider'

import { IProfile } from '@/shared/types/profile.types'

import ProfileData from '../../ui/Profile/ProfileData'
import ProfilePostList from '../../ui/Profile/ProfilePostList'
import { AuthService } from '@/services/auth.service'
import NotAuth from '@/components/ui/NotAuth'

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
				<NotAuth/>
			)}
		</>
	)
}
export default Profile
