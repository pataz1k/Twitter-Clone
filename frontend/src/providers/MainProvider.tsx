import { FC, PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import Layout from '../components/layout/Layout'

import { AuthProvider } from './AuthProvider'
import { NotificationsProvider } from './NotificationsProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<NotificationsProvider>
					<SkeletonTheme baseColor="#4d4646" highlightColor="#fff">
						<Layout>{children}</Layout>
						<Toaster
							toastOptions={{
								style: {
									background: '#202020',
									color: '#fff',
								},
							}}
						/>
					</SkeletonTheme>
				</NotificationsProvider>
			</AuthProvider>
		</QueryClientProvider>
	)
}
export default MainProvider
