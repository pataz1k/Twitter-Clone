import Link from 'next/link'
import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'react-query'

import MaterialIcon from '@/components/ui/MaterialIcons'

import { ITag } from '@/shared/types/post.types'

import ExploreContainer from '../ExploreContainer/ExploreContainer'

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
			<ExploreContainer heading="Most Popular Tags">
				<div className="flex items-center justify-center h-64 bg-gray-700 rounded-lg">
					<h1 className="text-xl font-bold text-red-400">
						Error loading popular tags.
					</h1>
				</div>
			</ExploreContainer>
		)
	}

	if (isLoading) {
		return (
			<ExploreContainer heading="Most Popular Tags">
				<div className="space-y-3">
					{[...Array(8)].map((_, index) => (
						<Skeleton
							key={index}
							height={40}
							className="rounded-lg"
							baseColor="#374151"
							highlightColor="#4B5563"
						/>
					))}
				</div>
			</ExploreContainer>
		)
	}

	if (isSuccess) {
		return (
			<ExploreContainer heading="Most Popular Tags">
				<div className="space-y-2">
					{data?.data
						.sort((a, b) => b.count - a.count)
						.slice(0, 8)
						.map((tag, index) => (
							<Link
								href={getTagPageUrl(tag.tag)}
								key={index}
								className="flex justify-between items-center p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300 group"
							>
								<h1 className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
									{tag.tag}
								</h1>
								<div className="flex items-center gap-2 bg-gray-600 px-2 py-1 rounded-full group-hover:bg-gray-500 transition-colors">
									<span className="text-sm text-gray-300 group-hover:text-white transition-colors">
										{tag.count}
									</span>
									<MaterialIcon
										name="MdPreview"
										classname="size-5 text-gray-400 group-hover:text-gray-200 transition-colors"
									/>
								</div>
							</Link>
						))}
				</div>
			</ExploreContainer>
		)
	}

	return null
}

export default PopularTags
