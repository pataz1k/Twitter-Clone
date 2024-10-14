import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcons'

import styles from './Navbar.module.scss'
import { INavbarItem } from './navbar.interface'

const NavbarItem: FC<{ item: INavbarItem }> = ({ item }) => {
	const pathname = usePathname()

	return (
		<li className={cn({ [styles.active]: pathname === item.link })}>
			<Link href={item.link} className={styles.navbarItem}>
				<MaterialIcon name={item.icon} />
				<p>{item.title}</p>
			</Link>
		</li>
	)
}
export default NavbarItem
