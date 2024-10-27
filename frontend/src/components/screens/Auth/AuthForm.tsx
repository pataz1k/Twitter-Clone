import { FC, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { AuthContext } from '@/providers/AuthProvider'

import styles from './Auth.module.scss'
import { AuthService } from '@/services/auth.service'
import { CookieService } from '@/services/cookie.service'

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
	const { updateAuthStatus } = useContext(AuthContext)

	const registerPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		AuthService.auth(authType, data)
			.then((res: IAuthRespose) => {
				if (res.data.success) {
					CookieService.setAccessToken(res.data.token).then(() =>
						updateAuthStatus()
					)
				}
			})
			.catch((err) => console.log(err))
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
