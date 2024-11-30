import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import toast from 'react-hot-toast'

import MaterialIcon from '@/components/ui/MaterialIcons'

import Logo from '@/ui/Logo'

import { NavbarData } from './Navbar.data'
import styles from './Navbar.module.scss'
import NavbarItem from './NavbarItem'
import useUserStore from '@/stores/user.store'

const Navbar: FC = () => {
	const { isAuth, expireAuthStatus } = useUserStore()

	const router = useRouter()

	const logout = () => {
		expireAuthStatus()
		toast.success('Logged out successfully')
		router.push('/')
	}

	return (
		<div className="flex flex-col h-screen p-5">
			<div className="flex-grow">
				<ul className="list-none">
					<Logo />
					{NavbarData.items.map((item) => (
						<NavbarItem key={item.title} item={item} />
					))}
				</ul>
			</div>
			{isAuth ? (
				<button onClick={logout} className={styles.logoutButton}>
					<MaterialIcon name="MdLogout" />
					Logout
				</button>
			) : (
				<Link href="/auth" className={styles.logoutButton}>
					<MaterialIcon name="MdLogin" />
					Login
				</Link>
			)}
		</div>
	)
}

export default Navbar
