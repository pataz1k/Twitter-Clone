import Image from 'next/image'
import { FC } from 'react'
import { motion } from 'motion/react'

import Heading from '@/components/ui/Heading'
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
			try {
				const fileList = new DataTransfer()
				fileList.items.add(file)
				const res = await ImagesService.uploadImage(fileList.files)
				const uploadedImagePath = res.data.paths[0]
				setAvatar(uploadedImagePath)
			} catch (error) {
				console.error('Error uploading image:', error)
			}
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg"
		>
			<Heading
				title="Profile Info"
				className="text-xl font-bold mb-6 pb-2 border-b border-gray-700"
			/>
			<div className="space-y-6">
				<div className="flex items-center space-x-4">
					<div className="relative w-24 h-24">
						<Image
							src={avatar || '/placeholder.svg'}
							alt="Avatar"
							fill
							className="rounded-full object-cover bg-gray-700"
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
							className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
						>
							Change Avatar
						</label>
					</div>
				</div>
				<div className="space-y-4">
					<InputField
						id="username"
						label="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value.toLowerCase())}
					/>
					<InputField
						id="fullname"
						label="Display Name"
						value={fullname}
						onChange={(e) => setFullname(e.target.value)}
					/>
					<div>
						<label htmlFor="bio" className="block text-sm font-medium text-gray-400 mb-1">
							About you
						</label>
						<textarea
							id="bio"
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none h-24"
						/>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

interface InputFieldProps {
	id: string
	label: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField: FC<InputFieldProps> = ({ id, label, value, onChange }) => (
	<div>
		<label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-1">
			{label}
		</label>
		<input
			type="text"
			id={id}
			value={value}
			onChange={onChange}
			className="w-full bg-gray-700 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
		/>
	</div>
)

export default ProfileInfo

