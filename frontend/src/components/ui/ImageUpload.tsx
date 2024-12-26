import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import MaterialIcon from './MaterialIcons'

interface FormData {
	images: FileList
}

interface ImageUploadModalProps {
	isOpen: boolean
	onClose: () => void
	onSubmit: (data: FormData) => void
}

const ImageUpload: FC<ImageUploadModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const { control, handleSubmit, reset } = useForm<FormData>()
	const [previews, setPreviews] = useState<string[]>([])

	const handleImageLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			const newPreviews = Array.from(files).map((file) =>
				URL.createObjectURL(file)
			)
			setPreviews((prev) => [...prev, ...newPreviews])
		}
	}

	const removeImage = (index: number) => {
		setPreviews((prev) => prev.filter((_, i) => i !== index))
	}

	const handleClose = () => {
		reset()
		setPreviews([])
		onClose()
	}

	const handleFormSubmit = (data: FormData) => {
		onSubmit(data)
		handleClose()
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
					<motion.div
						initial={{ scale: 0.5, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
						className="bg-gray-800 w-full max-w-md rounded-lg shadow-xl overflow-hidden"
					>
						<div className="px-6 py-4">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-2xl font-bold text-white">Image Upload</h2>
								<button
									onClick={handleClose}
									className="text-gray-400 hover:text-white focus:outline-none"
								>
									<MaterialIcon name="MdClose" classname="size-6" />
								</button>
							</div>
							<form
								onSubmit={handleSubmit(handleFormSubmit)}
								className="space-y-4"
							>
								<div>
									<label
										htmlFor="image-upload"
										className="block text-sm font-medium text-gray-300 mb-1"
									>
										Upload Images
									</label>
									<div className="mt-1 flex items-center">
										<Controller
											name="images"
											control={control}
											render={({ field: { onChange, onBlur, name } }) => (
												<input
													id="image-upload"
													type="file"
													multiple
													accept="image/*"
													className="hidden"
													onChange={(e) => {
														onChange(e.target.files)
														handleImageLoad(e)
													}}
													onBlur={onBlur}
													name={name}
												/>
											)}
										/>
										<button
											type="button"
											className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
											onClick={() =>
												document.getElementById('image-upload')?.click()
											}
										>
											<MaterialIcon name="MdAdd" classname="size-5 mr-1" />
											Select Images
										</button>
									</div>
								</div>

								{previews.length > 0 && (
									<div className="grid grid-cols-3 gap-4 mt-4">
										{previews.map((preview, index) => (
											<div key={index} className="relative">
												<Image
													src={preview}
													alt={`Preview ${index + 1}`}
													height={96}
													width={128}
													className="w-32 h-24 object-cover rounded"
												/>
												<button
													type="button"
													className="absolute top-0 right-0 -mt-2 -mr-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-300 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
													onClick={() => removeImage(index)}
												>
													<MaterialIcon name="MdClose" classname="size-5" />
													<span className="sr-only">Remove image</span>
												</button>
											</div>
										))}
									</div>
								)}

								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									Upload Images
								</button>
							</form>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}
export default ImageUpload
