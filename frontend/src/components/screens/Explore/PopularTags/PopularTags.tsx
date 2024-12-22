import Link from 'next/link'
import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'react-query'

import Heading from '@/components/ui/Heading'
import MaterialIcon from '@/components/ui/MaterialIcons'

import { ITag } from '@/shared/types/post.types'

import { getTagPageUrl } from '@/config/url.config'
import { PostService } from '@/services/post.service'

interface ITagsResponse {
	success: boolean
	data: ITag[]
}

const PopularTags: FC = () => {
	const { isSuccess, data, isLoading, isError } = useQuery(
		['get popular tags'],
		() => PostService.getTags(),
		{ select: ({ data }: { data: ITagsResponse }) => data }
	)

	if (isError) {
		return (
			<div className="w-1/2 border border-zinc-700 rounded-lg p-4 mt-5">
				<Heading title="Most popular tags" className="text-lg" />
				<h1 className="text-xl font-bold text-center m-5">
					Error loading popular tags.
				</h1>
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className="w-1/2 border border-zinc-700 rounded-lg p-4 mt-5">
				<Heading title="Most popular tags" className="text-lg" />
				<Skeleton count={8} height={25} />
			</div>
		)
	}

	if (isSuccess) {
		return (
			<div className="w-1/2 border border-zinc-700 rounded-lg p-4 mt-5">
				<Heading title="Most popular tags" className="text-lg" />
				{data?.data
					.sort((a, b) => b.count - a.count)
					.slice(0, 8)
					.map((tag, index) => (
						<Link
							href={getTagPageUrl(tag.tag)}
							key={index}
							className="flex justify-between p-2 hover:bg-gray-900 rounded-lg transition-colors"
						>
							<h1>{tag.tag}</h1>
							<p className="flex gap-2 justify-center items-center">
								{tag.count}
								<MaterialIcon name="MdPreview" classname="size-6" />
							</p>
						</Link>
					))}
			</div>
		)
	}
}

export default PopularTags
