import cn from 'classnames'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcons'

import styles from './Navbar.module.scss'
import { INavbarItem } from './navbar.interface'
import useNotificationStore from '@/stores/notification.store'

const NavbarItem: FC<{ item: INavbarItem }> = ({ item }) => {
	const pathname = usePathname()
	const { unReadNotifications } = useNotificationStore()

	return (
		<motion.li
			initial={{ scale: 1 }}
			whileHover={{ scale: 1.05 }}
			className={cn({ [styles.active]: pathname === item.link })}
		>
			<Link href={item.link} className={styles.navbarItem}>
				<MaterialIcon name={item.icon} />
				<p>{item.title}</p>
				{item.link === '/notifications' && (
					<span className="inline-flex mb-[-2px] items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 rounded-full">
						{unReadNotifications}
					</span>
				)}
			</Link>
		</motion.li>
	)
}
export default NavbarItem
