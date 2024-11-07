import { FC, useContext, useState } from 'react'
import { useQuery } from 'react-query'

import CreatePost from '@/components/ui/CreatePost/CreatePost'
import ImageUpload from '@/components/ui/ImageUpload'
import LinkButton from '@/components/ui/LinkButton'
import PostsList from '@/components/ui/PostsList/PostsList'

import { AuthContext } from '@/providers/AuthProvider'

import { ImagesService } from '@/services/images.service'
import { PostService } from '@/services/post.service'

interface FormData {
	images: FileList
}

const Home: FC = () => {
	const { isAuth } = useContext(AuthContext)

	const [isOpenImageUpload, setIsOpenImageUpload] = useState(false)
	const [imagePaths, setImagePaths] = useState<string[]>([])

	const openModal = () => setIsOpenImageUpload(true)
	const closeModal = () => setIsOpenImageUpload(false)
	console.log(imagePaths)

	const handleSubmit = (data: FormData) => {
		ImagesService.uploadImage(data.images)
			.then((res) => setImagePaths(res.data.paths))
			.catch((err) => console.log(err))
	}

	const { isSuccess, data, refetch } = useQuery(
		['get all posts'],
		() => PostService.getAll(),
		{ select: ({ data }) => data }
	)

	return (
		<div>
			<ImageUpload
				isOpen={isOpenImageUpload}
				onClose={closeModal}
				onSubmit={handleSubmit}
			/>
			{isAuth ? (
				<CreatePost refetchPosts={refetch} openImageUpload={openModal} />
			) : (
				<div className="flex justify-center gap-2 items-center p-5">
					<h1>You need to be log in to create new post.</h1>
					<LinkButton href={'/auth'} text="Login" />
				</div>
			)}
			<div className="border-t border-gray-700 py-2">
				{isSuccess && <PostsList posts={data.data} refetchPosts={refetch} />}
			</div>
		</div>
	)
}
export default Home
