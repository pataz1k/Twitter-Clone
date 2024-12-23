import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import AuthForm from './AuthForm'
import useUserStore from '@/stores/user.store'
import Meta from '@/utils/meta/Meta'

const Auth: FC = () => {
	const [authType, setAuthType] = useState<'login' | 'signup'>('login')

	const { isAuth } = useUserStore()
	const router = useRouter()

	if (isAuth) {
		router.push('/profile')
	}

	return (
		<Meta title="Auth">
			<div className="mt-8 p-5 border border-zinc-700 rounded-xl">
				<AuthForm authType={authType} />
				<button
					className="mt-2 hover:text-blue-500 underline transition-all"
					onClick={() => {
						authType == 'login' ? setAuthType('signup') : setAuthType('login')
					}}
				>
					{authType == 'login'
						? "Don't have an account? Sign up."
						: 'Already have an account? Login.'}
				</button>
			</div>
		</Meta>
	)
}
export default Auth
