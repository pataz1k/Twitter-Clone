import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useState } from 'react'

import MaterialIcon from '../ui/MaterialIcons'

import styles from './Layout.module.scss'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const [isNavbarOpen, setIsNavbarOpen] = useState(false)

	const { pathname } = useRouter()

	const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen)

	return (
		<div className={styles.layout}>
			<div className={`${styles.navbar} ${isNavbarOpen ? styles.open : ''}`}>
				<Navbar toggleNavbar={toggleNavbar} />
			</div>
			{pathname !== '/messages/[userID]' && (
				<button className={styles.navbarToggle} onClick={toggleNavbar}>
					{isNavbarOpen ? (
						<MaterialIcon name="MdClose" />
					) : (
						<MaterialIcon name="MdMenu" />
					)}
				</button>
			)}
			<div className={styles.center}>{children}</div>
			<div className={styles.sidebar}>
				<Sidebar />
			</div>
			{isNavbarOpen && (
				<div className={styles.overlay} onClick={toggleNavbar} />
			)}
		</div>
	)
}

export default Layout
