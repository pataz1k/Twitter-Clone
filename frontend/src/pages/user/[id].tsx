import { useRouter } from 'next/router'
import { FC, useContext, useEffect } from 'react'

import { AuthContext } from '@/providers/AuthProvider'

const index: FC = () => {
	const router = useRouter()

	const { isAuth, accessToken, accountID } = useContext(AuthContext)

	useEffect(() => {
		if (isAuth && accountID === router.query.id) {
			router.replace('/profile')
		}
	}, [accountID, router.query.id, isAuth])
	return <>{accountID !== router.query.id && <p>{router.query.id}</p>}</>
}
export default index
