import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

const ProfileItemSkeleton: FC = () => {
	return (
		<div className="flex gap-2 items-center mb-3 hover:bg-zinc-900 transition-colors py-2 pr-3 rounded-md">
			<Skeleton circle width={40} height={40} />
			<Skeleton width={100} />
		</div>
	)
}
export default ProfileItemSkeleton
