import Image from 'next/image'
import { FC } from 'react'

import Heading from '@/components/ui/Heading'

import styles from './ProfileInfo.module.scss'
import { ImagesService } from '@/services/images.service'
import useSettingsStore from '@/stores/settings.store'

const ProfileInfo: FC = () => {
	const {
		username,
		fullname,
		avatar,
		bio,
		setUsername,
		setFullname,
		setAvatar,
		setBio,
	} = useSettingsStore()

	const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			//   setIsUploading(true)
			try {
				const fileList = new DataTransfer()
				fileList.items.add(file)
				const res = await ImagesService.uploadImage(fileList.files)
				const uploadedImagePath = res.data.paths[0]
				setAvatar(uploadedImagePath)
			} catch (error) {
				console.error('Error uploading image:', error)
				// Here you can add user-facing error handling
			} finally {
				// setIsUploading(false)
			}
		}
	}

	return (
		<div>
			<Heading
				title="Profile Info"
				className="border-b border-gray-700 pb-4 text-xl"
			/>
			<div className={styles.profileInfo}>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor="fullname">Display Name</label>
				<input
					type="text"
					id="fullname"
					value={fullname}
					onChange={(e) => setFullname(e.target.value)}
				/>
				<label htmlFor="bio">About you</label>
				<textarea
					id="bio"
					value={bio}
					onChange={(e) => setBio(e.target.value)}
				/>
				<div className="space-y-4">
					<div className="flex items-center space-x-4 mb-6">
						<div className="relative w-24 h-24">
							<Image
								src={avatar || '/placeholder.svg'}
								alt="Avatar"
								fill
								className="rounded-full object-cover bg-gray-800"
							/>
						</div>
						<div>
							<input
								type="file"
								id="avatar"
								accept="image/*"
								onChange={handleAvatarChange}
								className="hidden"
							/>
							<label
								htmlFor="avatar"
								className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors"
							>
								Change Avatar
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default ProfileInfo
