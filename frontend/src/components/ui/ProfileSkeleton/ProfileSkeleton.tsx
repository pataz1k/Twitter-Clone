import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import styles from './ProfileSkeleton.module.scss'

const ProfileSkeleton:FC = () => {
  return (
    <>
			<div className="border border-gray-800 rounded-lg mt-5">
				<div className={styles.banner}></div>
				<div className="ml-2">
					<div className='mt-[-65px] mb-3'> 
						<Skeleton width={130} height={130} circle className='border-[6px] border-black'/>
					</div>
					<Skeleton count={4} height={15} width={200}/>
				</div>
			</div>
		</>
  )
}

export default ProfileSkeleton