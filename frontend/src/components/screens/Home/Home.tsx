import { FC, useContext, useState } from 'react'
import { useQuery } from 'react-query'

import PostListSkeleton from '@/components/PostsList/PostListSkeleton'
import PostsList from '@/components/PostsList/PostsList'
import CreatePost from '@/components/ui/CreatePost/CreatePost'
import ImageUpload from '@/components/ui/ImageUpload'
import LinkButton from '@/components/ui/LinkButton'

import { AuthContext } from '@/providers/AuthProvider'

import { ButtonColor } from '@/constants/buttonColor.enum'
import { ImagesService } from '@/services/images.service'
import { PostService } from '@/services/post.service'
import Meta from '@/utils/meta/Meta'

interface FormData {
	images: FileList
}

const Home: FC = () => {
	const { isAuth } = useContext(AuthContext)

	const [isOpenImageUpload, setIsOpenImageUpload] = useState(false)
	const [imagePaths, setImagePaths] = useState<string[]>([])

	const openModal = () => setIsOpenImageUpload(true)
	const closeModal = () => setIsOpenImageUpload(false)

	const handleSubmit = (data: FormData) => {
		ImagesService.uploadImage(data.images)
			.then((res) => setImagePaths(res.data.paths))
			.catch((err) => console.log(err))
	}

	const { isSuccess, isLoading, data, refetch } = useQuery(
		['get all posts'],
		() => PostService.getAll(),
		{ select: ({ data }) => data }
	)

	return (
		<Meta title="Home">
			<div>
				<ImageUpload
					isOpen={isOpenImageUpload}
					onClose={closeModal}
					onSubmit={handleSubmit}
				/>
				{isAuth ? (
					<CreatePost
						refetchPosts={refetch}
						openImageUpload={openModal}
						images={imagePaths}
					/>
				) : (
					<div className="flex justify-center gap-2 items-center p-5">
						<h1>You need to be log in to create new post.</h1>
						<LinkButton
							color={ButtonColor.PRIMARY}
							href={'/auth'}
							text="Login"
						/>
					</div>
				)}
				<div className="border-t border-gray-700 py-2">
					{isLoading && <PostListSkeleton />}
					{isSuccess && <PostsList posts={data.data} refetchPosts={refetch} />}
				</div>
			</div>
		</Meta>
	)
}
export default Home
