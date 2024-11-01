import Image from 'next/image'
import { FC, useState } from 'react'

import FollowersModal from '@/components/ui/FollowersModal/FollowersModal'

import { IProfile } from '@/shared/types/profile.types'

import styles from './Profile.module.scss'

const ProfileData: FC<{ profile: IProfile | undefined }> = ({ profile }) => {
	const formatDate = (isoDate: string | undefined) => {
		return isoDate ? new Date(isoDate).getUTCFullYear() : ''
	}
	console.log(profile)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalType, setModalType] = useState<'followers' | 'following'>(
		'followers'
	)
	const closeModal = () => setIsModalOpen(false)
	const openModal = (modalType: 'followers' | 'following') => {
		setIsModalOpen(true)
		setModalType(modalType)
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
						className="rounded-full mt-[-65px] border-[6px] border-black"
					/>
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
			</div>
		</>
	)
}
export default ProfileData
