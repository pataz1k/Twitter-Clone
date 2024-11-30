import { FC } from 'react'

import useUserStore from '@/stores/user.store'

const Notifications: FC = () => {
	const { setAccessToken, isAuth, expireAuthStatus } = useUserStore()
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDdiNTRhM2ViNWU0M2U4NDA2YTBmNiIsInVzZXJuYW1lIjoicGF0YXoxayIsImlhdCI6MTczMjc5NTQ0MSwiZXhwIjoxNzM1Mzg3NDQxfQ.3hbIRMSximr3YW4RP2U7i0EL71Ts_ew8Vn7ShGvBHSY'
	const addToken = () => {
		setAccessToken(token)
	}
	return (
		<div>
			<h1>isAuth: {isAuth ? 'true' : 'false'}</h1>
			<button
				className="rounded-2xl bg-slate-500 p-2 text-white"
				onClick={addToken}
			>
				ADD TOKEN TEST
			</button>
			<button
				className="rounded-2xl bg-slate-500 p-2 text-white"
				onClick={expireAuthStatus}
			>
				EXPIRE AUTH STATE
			</button>
		</div>
	)
}
export default Notifications
