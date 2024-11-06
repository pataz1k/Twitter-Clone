import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'
import { useJwt } from 'react-jwt'

import { CookieService } from '@/services/cookie.service'

interface IAuthContext {
	isAuth: boolean
	accessToken: string
	updateAuthStatus: () => void
	accountUsername: string
}
interface IDecodedToken {
	id: string
	username: string
	iat: number
	exp: number
}

const initialValue = {
	isAuth: false,
	accessToken: '',
	updateAuthStatus: () => {},
	accountUsername: '',
}

const AuthContext = createContext<IAuthContext>(initialValue)
const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(initialValue.isAuth)
	const [accessToken, setAccessToken] = useState('')

	useEffect(() => {
		CookieService.getAccessToken().then((res) => {
			if (res) {
				setIsAuth(true)
				setAccessToken(res)
			} else {
				setIsAuth(false)
				setAccessToken('')
			}
		})
	}, [])

	const updateAuthStatus = () => {
		CookieService.getAccessToken().then((res) => {
			if (res) {
				setIsAuth(true)
				setAccessToken(res)
			} else {
				setIsAuth(false)
				setAccessToken('')
			}
		})
	}

	const { decodedToken, isExpired } = useJwt<IDecodedToken>(accessToken)
	console.log(decodedToken)

	return (
		<AuthContext.Provider
			value={{
				isAuth,
				accessToken,
				updateAuthStatus,
				accountUsername: decodedToken?.username || '',
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
export { AuthProvider, AuthContext }
