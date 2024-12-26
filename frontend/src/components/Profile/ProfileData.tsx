import cn from 'classnames'
import { AnimatePresence } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

import FollowersModal from '@/components/ui/FollowersModal/FollowersModal'
import FullScreenGallery from '../ui/FullScreenGallery'
import GradientBanner from '../ui/GradientBanner'
import LinkButton from '../ui/LinkButton'
import MaterialIcon from '../ui/MaterialIcons'

import { IProfile } from '@/shared/types/profile.types'
import { getDMPageUrl } from '@/config/url.config'
import { LinkButtonColor } from '@/constants/linkButtonColor.enum'
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
	const [isFullScreen, setIsFullScreen] = useState(false)

	const closeModal = () => setIsModalOpen(false)
	const openModal = (modalType: modalTypeEnum) => {
		setIsModalOpen(true)
		setModalType(modalType)
	}

	const followClick = () => {
		if (profile?.isFollowing) {
			UserService.unfollowUser(token!, profile._id)
				.then(() => {
					toast.success(`Unfollowed ${profile?.username}`)
				})
				.catch((err) => console.log(err))
				.finally(refetchProfile)
		} else {
			UserService.followUser(token!, profile!._id)
				.then(() => {
					toast.success(`Followed ${profile?.username}`)
				})
				.catch((err) => console.log(err))
				.finally(refetchProfile)
		}
	}

	return (
		<>
			<AnimatePresence>
				{isFullScreen && (
					<FullScreenGallery
						images={[profile?.avatar!]}
						active={profile?.avatar!}
						onClose={() => setIsFullScreen(false)}
					/>
				)}
				{isModalOpen && (
					<FollowersModal
						onClose={closeModal}
						followers={
							modalType === modalTypeEnum.FOLLOWERS
								? profile?.followers!
								: profile?.following!
						}
					/>
				)}
			</AnimatePresence>

			<div className="bg-gray-900 border border-gray-800 rounded-lg mt-5 overflow-hidden shadow-lg">
				<GradientBanner banner={profile?.settings?.banner!} />
				<div className="px-6 py-4 relative">
					<div className="absolute top-0 left-6 transform -translate-y-1/2">
						<button
							onClick={() => setIsFullScreen(true)}
							className="group relative rounded-full w-32 h-32 overflow-hidden border-4 border-gray-900 shadow-lg transition-transform hover:scale-105"
						>
							<Image
								alt="Profile picture"
								src={profile?.avatar!}
								width={128}
								height={128}
								priority
								className="rounded-full object-cover size-32"
							/>
							<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
								<MaterialIcon name="MdSearch" classname="text-white text-3xl" />
							</div>
						</button>
					</div>
					<div className="mt-16 flex justify-between items-start">
						<div className="space-y-2">
							<h3 className="font-bold text-2xl text-white">{profile?.fullname}</h3>
							<span className="text-gray-400">@{profile?.username}</span>
							<p className="text-gray-300 mt-2">{profile?.bio}</p>
							<p className="text-gray-400 text-sm">
								<span className="font-semibold">Joined: </span>
								{format(profile?.createdAt!, 'MMMM d, yyyy')}
							</p>
							<div className="flex gap-6 mt-3">
								<button
									onClick={() => openModal(modalTypeEnum.FOLLOWING)}
									className="text-gray-300 hover:text-white transition-colors"
								>
									<span className="font-bold">{profile?.followingCount}</span>{' '}
									<span className="text-gray-400">Following</span>
								</button>
								<button
									onClick={() => openModal(modalTypeEnum.FOLLOWERS)}
									className="text-gray-300 hover:text-white transition-colors"
								>
									<span className="font-bold">{profile?.followersCount}</span>{' '}
									<span className="text-gray-400">Followers</span>
								</button>
							</div>
						</div>
						<div className="flex items-center gap-3">
							{canFollow ? (
								<>
									<Link
										href={getDMPageUrl(profile?._id!)}
										className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
									>
										<MaterialIcon name="MdMail" classname="text-white text-xl" />
									</Link>
									<button
										onClick={followClick}
										className={cn(
											'py-2 px-4 rounded-full transition-colors text-sm font-medium',
											{
												'bg-blue-600 hover:bg-blue-700 text-white': !profile?.isFollowing,
												'bg-gray-700 hover:bg-gray-600 text-white': profile?.isFollowing,
											}
										)}
									>
										{profile?.isFollowing ? 'Following' : 'Follow'}
									</button>
								</>
							) : (
								<LinkButton
									color={LinkButtonColor.SECONDARY}
									href="/profile/settings"
									text="Edit Profile"
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProfileData

