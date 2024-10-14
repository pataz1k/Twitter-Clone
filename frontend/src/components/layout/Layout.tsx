import { FC, PropsWithChildren } from 'react'

import styles from './Layout.module.scss'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Navbar />
			<div className={styles.center}>{children}</div>
			<Sidebar />
		</div>
	)
}
export default Layout
