import { useRouter } from 'next/router'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { AuthService } from '@/services/auth.service'
import useUserStore from '@/stores/user.store'

type Inputs = {
	username: string
	password: string
}

interface IAuthData {
	success: boolean
	token: string
}

interface IAuthRespose {
	data: IAuthData
}

const AuthForm: FC<{ authType: 'login' | 'signup' }> = ({ authType }) => {
	const { setAccessToken } = useUserStore()

	const router = useRouter()

	const registerPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const toastId = toast.loading('Logging in...')

		AuthService.auth(authType, data)
			.then((res: IAuthRespose) => {
				if (res.data.success) {
					setAccessToken(res.data.token)
					router.push('/profile')

					toast.success('Logged in successfully', {
						id: toastId,
					})
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message, {
					id: toastId,
				})
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<h1 className="text-2xl font-bold text-white text-center">
				{authType === 'login' ? 'Login' : 'Sign Up'}
			</h1>
			<div className="space-y-4">
				<div>
					<input
						className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="Username"
						{...register('username', {
							required: { value: true, message: 'Username is required' },
							pattern: {
								value: /^[0-9A-Za-z]/i,
								message: 'Invalid username format',
							},
						})}
					/>
					{errors.username && (
						<p className="mt-1 text-sm text-red-500">
							{errors.username.message}
						</p>
					)}
				</div>
				<div>
					<input
						className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						placeholder="Password"
						type="password"
						{...register('password', {
							required: { value: true, message: 'Password is required' },
							pattern: {
								value: authType === 'signup' ? registerPattern : /^.*$/,
								message:
									'Password must be at least 6 characters long and contain at least one letter and one number',
							},
						})}
					/>
					{errors.password && (
						<p className="mt-1 text-sm text-red-500">
							{errors.password.message}
						</p>
					)}
				</div>
			</div>
			<button
				type="submit"
				className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
			>
				{authType === 'login' ? 'Login' : 'Sign Up'}
			</button>
		</form>
	)
}

export default AuthForm
