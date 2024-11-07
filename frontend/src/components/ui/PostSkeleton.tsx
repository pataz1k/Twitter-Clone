import Skeleton from 'react-loading-skeleton'

export default function PostSkeleton() {
	return (
		<div className="p-4 border border-gray-700 rounded-xl flex flex-col items-start mb-3 mt-3">
			<div className="flex items-center w-full mb-4">
				<Skeleton circle width={40} height={40} />
				<div className="ml-2 flex-grow">
					<Skeleton width={120} />
				</div>
			</div>

			<Skeleton count={3} className="w-full mb-4" />

			<Skeleton height={200} className="w-full mb-4" />

			<div className="flex flex-wrap gap-2 mb-4">
				{[...Array(3)].map((_, index) => (
					<Skeleton key={index} width={60} />
				))}
			</div>

			<Skeleton width={100} className="mb-4" />

			<div className="w-full h-[1px] bg-zinc-700 my-3"></div>

			<div className="flex justify-between w-full">
				{[...Array(3)].map((_, index) => (
					<div key={index} className="flex items-center">
						<Skeleton circle width={20} height={20} className="mr-2" />
						<Skeleton width={30} />
					</div>
				))}
			</div>
		</div>
	)
}
