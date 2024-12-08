import cn from 'classnames'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcons'

import styles from './Navbar.module.scss'
import { INavbarItem } from './navbar.interface'

const NavbarItem: FC<{ item: INavbarItem }> = ({ item }) => {
	const pathname = usePathname()

	return (
		<motion.li
			initial={{ scale: 1 }}
			whileHover={{ scale: 1.05 }}
			className={cn({ [styles.active]: pathname === item.link })}
		>
			<Link href={item.link} className={styles.navbarItem}>
				<MaterialIcon name={item.icon} />
				<p>{item.title}</p>
			</Link>
		</motion.li>
	)
}
export default NavbarItem
