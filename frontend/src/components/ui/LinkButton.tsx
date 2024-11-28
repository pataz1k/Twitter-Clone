import cn from 'classnames'
import Link from 'next/link'
import { FC } from 'react'

import { ButtonColor } from '@/constants/buttonColor.enum'

interface ILinkButton {
	text: string
	href: string
	color: ButtonColor
}

const LinkButton: FC<ILinkButton> = ({ text, href, color }) => {
	return (
		<Link
			className={cn(
				'p-2 px-4 rounded-2xl transition-colors h-11 flex items-center justify-center',
				{
					'bg-slate-600 hover:bg-slate-700': color === ButtonColor.SECONDARY,
					'bg-blue-500 hover:bg-blue-700': color === ButtonColor.PRIMARY,
				}
			)}
			href={href}
		>
			{text}
		</Link>
	)
}

export default LinkButton
