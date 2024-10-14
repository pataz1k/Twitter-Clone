import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'

import { CookieService } from '@/services/cookie.service'

interface IAuthContext {
	isAuth: boolean
	accessToken: string
	updateAuthStatus: () => void
}

const initialValue = {
	isAuth: false,
	accessToken: '',
	updateAuthStatus: () => {},
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

	return (
		<AuthContext.Provider value={{ isAuth, accessToken, updateAuthStatus }}>
			{children}
		</AuthContext.Provider>
	)
}
export { AuthProvider, AuthContext }
