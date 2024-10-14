import { useRouter } from 'next/router'
import { FC, useContext, useState } from 'react'

import { AuthContext } from '@/providers/AuthProvider'

import AuthForm from './AuthForm'

const Auth: FC = () => {
	const [authType, setAuthType] = useState<'login' | 'signup'>('login')

	const { isAuth } = useContext(AuthContext)
	const router = useRouter()

	if (isAuth) {
		router.push('/profile')
	}

	return (
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
	)
}
export default Auth
