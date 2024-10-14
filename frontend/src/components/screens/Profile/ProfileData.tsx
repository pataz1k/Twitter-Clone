import Image from 'next/image'
import { FC } from 'react'

import { IProfile } from '@/shared/types/profile.types'

import styles from './Profile.module.scss'

const ProfileData: FC<{ profile: IProfile | undefined }> = ({ profile }) => {
	const formatDate = (isoDate) => {
		const date = new Date(isoDate).getUTCFullYear()

		return date
	}

	return (
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
					<p>
						<span className="font-bold">{profile?.followingCount}</span>{' '}
						Following
					</p>
					<p>
						<span className="font-bold">{profile?.followingCount}</span>{' '}
						Followers
					</p>
				</div>
			</div>
		</div>
	)
}
export default ProfileData
