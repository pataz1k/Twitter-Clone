import Image from 'next/image'
import { FC, useState } from 'react'
import cn from 'classnames'

import FollowersModal from '@/components/ui/FollowersModal/FollowersModal'

import { IProfile } from '@/shared/types/profile.types'

import styles from './Profile.module.scss'
import { UserService } from '@/services/user.service'

interface IProfileData {
	profile: IProfile | undefined
	canFollow?: boolean
	token?: string
	refetchProfile: () => void
}

const ProfileData: FC<IProfileData> = ({ profile, canFollow = false, token, refetchProfile }) => {

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalType, setModalType] = useState<'followers' | 'following'>(
		'followers'
	)

	const formatDate = (isoDate: string | undefined) => {
		return isoDate ? new Date(isoDate).getUTCFullYear() : ''
	}
	
	const closeModal = () => setIsModalOpen(false)
	const openModal = (modalType: 'followers' | 'following') => {
		setIsModalOpen(true)
		setModalType(modalType)
	}

	const followClick = () => {
		if (profile?.isFollowing) {
			UserService.unfollowUser(token!,profile._id)
			.then(res => console.log(res))
			.catch(err => console.log(err))
			.finally(refetchProfile)
		} else {
			UserService.followUser(token!,profile!._id)
			.then(res => console.log(res))
			.catch(err => console.log(err))
			.finally(refetchProfile)
		}
	}

	return (
		<>
			<FollowersModal
				isOpen={isModalOpen}
				onClose={closeModal}
				followers={
					modalType === 'followers' ? profile?.followers! : profile?.following!
				}
			/>
			<div className="border border-gray-800 rounded-lg mt-5">
				<div className={styles.banner}></div>
				<div className="ml-2">
					<Image
						alt="pfp"
						src={profile?.avatar!}
						width={130}
						height={130}
						priority
						className="rounded-full mt-[-65px] border-[6px] border-black"
					/>
					<div className='flex justify-between'>
						<div>
						<h3 className="font-bold text-xl">{profile?.fullname}</h3>
						<span className="text-gray-500">@{profile?.username}</span>
						<p>{profile?.bio}</p>
						<p>
							<span className="font-bold">Join Scince: </span>
							{formatDate(profile?.createdAt)}
						</p>
						<div className="flex gap-3">
							<button
								onClick={() => {
									openModal('following')
								}}
							>
								<span className="font-bold">{profile?.followingCount}</span>{' '}
								Following
							</button>
							<button
								onClick={() => {
									openModal('followers')
								}}
							>
								<span className="font-bold">{profile?.followersCount}</span>{' '}
								Followers
							</button>
						</div>
						</div>
						{canFollow &&
						<button 
						onClick={followClick} 
						className={cn('p-2 px-4 rounded-2xl transition-colors mr-5 mb-7', {
							'bg-blue-500  hover:bg-blue-700': !profile?.isFollowing,
							'bg-slate-600  hover:bg-slate-700': profile?.isFollowing
						})}>
							{profile?.isFollowing ? "unFollow" : "Follow"}
						</button>
							}
					</div>
				</div>
			</div>
		</>
	)
}
export default ProfileData
