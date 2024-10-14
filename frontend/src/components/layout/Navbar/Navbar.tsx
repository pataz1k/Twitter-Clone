import { FC } from 'react'

import Logo from '@/ui/Logo'

import { NavbarData } from './Navbar.data'
import NavbarItem from './NavbarItem'

const Navbar: FC = () => {
	return (
		<div className="p-5">
			<ul className="list-none">
				<Logo />
				{NavbarData.items.map((item) => (
					<NavbarItem key={item.title} item={item} />
				))}
			</ul>
		</div>
	)
}
export default Navbar
