import { useRouter } from 'next/router'
import { FC } from 'react'

import MaterialIcon from '../MaterialIcons'

import styles from './BackButton.module.scss'

const BackButton: FC = () => {
	const router = useRouter()
	return (
		<button onClick={router.back} className={styles.backButton}>
			<MaterialIcon name="MdArrowBack" />
		</button>
	)
}
export default BackButton
