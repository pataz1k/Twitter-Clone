import { FC } from 'react'

import LinkButton from '@/components/ui/LinkButton'

import { ButtonColor } from '@/constants/buttonColor.enum'
import Meta from '@/utils/meta/Meta'

const NotFound: FC = () => {
	return (
		<Meta title="Not Found">
			<div className="flex flex-col justify-center items-center mt-5">
				<h1 className="font-bold text-xl mb-2">
					Page what you looking for is not found!
				</h1>
				<LinkButton
					color={ButtonColor.PRIMARY}
					text="Go to main page"
					href="/"
				/>
			</div>
		</Meta>
	)
}

export default NotFound
