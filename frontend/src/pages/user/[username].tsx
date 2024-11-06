import { useRouter } from 'next/router'
import { FC, useContext, useEffect } from 'react'

import { AuthContext } from '@/providers/AuthProvider'
import NotAuth from '@/components/ui/NotAuth'
import { IProfile } from '@/shared/types/profile.types'
import { useQuery } from 'react-query'
import { UserService } from '@/services/user.service'
import ProfileData from '@/components/ui/Profile/ProfileData'
import ProfilePostList from '@/components/ui/Profile/ProfilePostList'


interface IProfileResponse {
	success: boolean
	data: IProfile
}

const UserPage: FC = () => {
	const router = useRouter()

	const { isAuth, accessToken, accountUsername } = useContext(AuthContext)

	useEffect(() => {
		if (isAuth && accountUsername === router.query.username) {
			router.replace('/profile')
		}
	}, [accountUsername, router.query.username, isAuth])

	const { isSuccess, isLoading,data, refetch} = useQuery(
		['get user profile'],
		() => UserService.getUser(accessToken, router.query.username?.toString()!),
		{ select: ({ data }: { data: IProfileResponse }) => data, enabled: isAuth && router.query.username !== undefined }
	)
	if (isLoading) {
		return <p>Loading...</p>
	}
	
	return <>{!isAuth ? <NotAuth/> : isSuccess && 	
	<>
		<ProfileData profile={data?.data} />
		<ProfilePostList profile={data?.data!} refetchPosts={refetch} />
	</>

	}</>
}
export default UserPage
