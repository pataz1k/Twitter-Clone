import { FC } from 'react'

import LinkButton from './LinkButton'
import { ButtonColor } from '@/constants/buttonColor.enum'
import Meta from '@/utils/meta/Meta'

const NotAuth: FC = () => {
	return (
		<Meta title="Not Auth">
			<div className="flex flex-col justify-center items-center">
				<h1 className="text-2xl mb-2">You aren&apos;t auth!</h1>
				<LinkButton color={ButtonColor.PRIMARY} href={'/auth'} text="Login" />
			</div>
		</Meta>
	)
}

export default NotAuth
