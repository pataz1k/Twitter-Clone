import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logo from '@/public/logo.svg'

const Logo: FC = () => {
	return (
		<li className="p-3 list-none">
			<Link href="/">
				<Image
					src={logo}
					alt="logo"
					draggable={false}
					width={32}
					height={32}
					style={{ width: '32px', height: '32px' }}
				/>
			</Link>
		</li>
	)
}
export default Logo
