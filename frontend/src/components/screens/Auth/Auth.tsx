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
			<div className="flex flex-col items-center justify-center min-h-screen px-4">
				<div className="w-full max-w-md">
					<div className="bg-gray-800 shadow-lg rounded-lg p-8 space-y-8">
						<AuthForm authType={authType} />
						<div className="text-center">
							<span className="text-gray-300">
								{authType === 'login'
									? "Don't have an account? "
									: 'Already have an account? '}
								<button
									className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
									onClick={() =>
										setAuthType(authType === 'login' ? 'signup' : 'login')
									}
								>
									{authType === 'login' ? 'Sign up' : 'Login'}
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</Meta>
	)
}

export default Auth
