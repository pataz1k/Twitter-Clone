import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'

import FollowersModal from '@/components/ui/FollowersModal/FollowersModal'

import { IProfile } from '@/shared/types/profile.types'

import GradientBanner from '../ui/GradientBanner'
import LinkButton from '../ui/LinkButton'
import MaterialIcon from '../ui/MaterialIcons'

import styles from './Profile.module.scss'
import { getDMPageUrl } from '@/config/url.config'
import { ButtonColor } from '@/constants/buttonColor.enum'
import { modalTypeEnum } from '@/constants/modalType.enum'
import { UserService } from '@/services/user.service'

interface IProfileData {
	profile: IProfile | undefined
	canFollow?: boolean
	token?: string
	refetchProfile: () => void
}

const ProfileData: FC<IProfileData> = ({
	profile,
	canFollow = false,
	token,
	refetchProfile,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalType, setModalType] = useState<modalTypeEnum>(
		modalTypeEnum.FOLLOWERS
	)

	const formatDate = (isoDate: string | undefined) => {
		return isoDate ? new Date(isoDate).getUTCFullYear() : ''
	}

	const closeModal = () => setIsModalOpen(false)
	const openModal = (modalType: modalTypeEnum) => {
		setIsModalOpen(true)
		setModalType(modalType)
	}

	const followClick = () => {
		if (profile?.isFollowing) {
			UserService.unfollowUser(token!, profile._id)
				.then((res) => {
					toast.success(`Unfollowed ${profile?.username}`)
				})
				.catch((err) => console.log(err))
				.finally(refetchProfile)
		} else {
			UserService.followUser(token!, profile!._id)
				.then((res) => {
					toast.success(`Followed ${profile?.username}`)
				})
				.catch((err) => console.log(err))
				.finally(refetchProfile)
		}
	}

	return (
		<>
			<FollowersModal
				isOpen={isModalOpen}
				onClose={closeModal}
				followers={
					modalType === modalTypeEnum.FOLLOWERS
						? profile?.followers!
						: profile?.following!
				}
			/>
			<div className="border border-gray-800 rounded-lg mt-5">
				<GradientBanner banner={profile?.settings?.banner!} />
				<div className="ml-2 relative">
					<Image
						alt="pfp"
						src={profile?.avatar!}
						width={130}
						height={130}
						priority
						className="rounded-full mt-[-65px] border-[6px] border-black"
					/>
					<div className="flex justify-between">
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
										openModal(modalTypeEnum.FOLLOWING)
									}}
								>
									<span className="font-bold">{profile?.followingCount}</span>{' '}
									Following
								</button>
								<button
									onClick={() => {
										openModal(modalTypeEnum.FOLLOWERS)
									}}
								>
									<span className="font-bold">{profile?.followersCount}</span>{' '}
									Followers
								</button>
							</div>
						</div>
						{canFollow ? (
							<div className="flex items-center mr-2 gap-2">
								<Link
									href={getDMPageUrl(profile?._id!)}
									className={`${styles.messageButton} p-2 px-4 rounded-2xl transition-colors h-11 flex items-center justify-center bg-slate-600 hover:bg-slate-700`}
								>
									<MaterialIcon name="MdMail" />
								</Link>
								<button
									onClick={followClick}
									className={cn(
										'p-2 px-4 rounded-2xl transition-colors h-11 flex items-center justify-center',
										{
											'bg-blue-500 hover:bg-blue-700': !profile?.isFollowing,
											'bg-slate-600 hover:bg-slate-700': profile?.isFollowing,
										}
									)}
								>
									{profile?.isFollowing ? 'Following' : 'Follow'}
								</button>
							</div>
						) : (
							<div className="flex items-center mr-2">
								<LinkButton
									color={ButtonColor.SECONDARY}
									href="/profile/settings"
									text="Edit Profile"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
export default ProfileData
