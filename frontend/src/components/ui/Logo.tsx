import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logo from '@/public/logo.svg'

const Logo: FC = () => {
	return (
		<li className="p-3">
			<Link href={'/'}>
				<Image src={logo} width={32} height={32} alt="logo" draggable={false} />
			</Link>
		</li>
	)
}
export default Logo
