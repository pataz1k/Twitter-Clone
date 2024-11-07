import { useRouter } from 'next/router'
import { FC, useContext, useEffect } from 'react'
import { useQuery } from 'react-query'

import NotAuth from '@/components/ui/NotAuth'
import ProfileData from '@/components/ui/Profile/ProfileData'
import ProfilePostList from '@/components/ui/Profile/ProfilePostList'

import { AuthContext } from '@/providers/AuthProvider'

import { IProfile } from '@/shared/types/profile.types'

import LinkButton from '@/components/ui/LinkButton'
import { UserService } from '@/services/user.service'
import ProfileSkeleton from '@/components/ui/ProfileSkeleton/ProfileSkeleton'

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

	const { isSuccess, isLoading, isError, error, data, refetch } = useQuery(
		['get user profile'],
		() => UserService.getUser(accessToken, router.query.username?.toString()!),
		{
			select: ({ data }: { data: IProfileResponse }) => data,
			enabled: isAuth && router.query.username !== undefined,
			retry: false,
		}
	)
	if (isLoading) return <p>Loading...</p>
	
	if (isError && error?.response.status === 404) return <div className='flex flex-col items-center justify-center'><p>User Not found</p> <LinkButton text='Go to Main Page' href='/'/></div>

	return (
		<>
			{/* {!isAuth ? (
				<NotAuth />
			) : (
				isSuccess && (
					<>
						<ProfileData profile={data?.data}  canFollow={true} refetchProfile={refetch} token={accessToken}/>
						<ProfilePostList profile={data?.data!} refetchPosts={refetch} />
					</>
				)
			)} */}
			<ProfileSkeleton/>
		</>
	)
}
export default UserPage
