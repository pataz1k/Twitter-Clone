import { useRouter } from 'next/router'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import styles from './Auth.module.scss'
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
		<>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h1 className="mb-3 font-bold text-lg">
					{authType == 'login' ? 'Login' : 'Sign Up'}
				</h1>
				<input
					className="text-black"
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
					<p className="text-red-600 text-sm">{errors.username.message}</p>
				)}
				<input
					className="text-black"
					placeholder="Password"
					type="password"
					{...register('password', {
						required: { value: true, message: 'Password is required' },
						pattern: {
							value: authType == 'signup' ? registerPattern : /^.*$/,
							message:
								'Password must be at least 6 characters long and contain at least one letter and one number',
						},
					})}
				/>
				{errors.password && (
					<p className="text-red-600 text-sm">{errors.password.message}</p>
				)}
				<button type="submit">
					{authType == 'login' ? 'Login' : 'Sign Up'}
				</button>
			</form>
		</>
	)
}
export default AuthForm
