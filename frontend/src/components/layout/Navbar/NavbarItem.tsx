import cn from 'classnames'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcons'

import styles from './Navbar.module.scss'
import { INavbarItem } from './navbar.interface'
import useNotificationStore from '@/stores/notification.store'
import useUserStore from '@/stores/user.store'

const NavbarItem: FC<{ item: INavbarItem, onClick: () => void }> = ({ item, onClick }) => {
	const pathname = usePathname()
	const { unReadNotifications } = useNotificationStore()
	const {isAuth} = useUserStore()

	return (
		<motion.li
			initial={{ scale: 1 }}
			whileHover={{ scale: 1.05 }}
			className={cn({ [styles.active]: pathname === item.link })}
		>
			<Link href={item.link} className={styles.navbarItem} onClick={onClick}>
				<MaterialIcon name={item.icon} />
				<p>{item.title}</p>
				{item.link === '/notifications' && isAuth && (
					<span className="inline-flex mb-[-2px] items-center justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 rounded-full">
						{unReadNotifications}
					</span>
				)}
			</Link>
		</motion.li>
	)
}
export default NavbarItem
