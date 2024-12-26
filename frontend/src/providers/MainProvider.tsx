import { FC, PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import LoadingScreen from '@/components/LoadingScreen/LoadingScreen'
import LoadingWrapper from '@/components/LoadingScreen/LoadingWrapper'

import Layout from '../components/layout/Layout'

import { NotificationsProvider } from './NotificationsProvider'
import ThemeProvider from './ThemeProvider'

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
			<ThemeProvider>
				<NotificationsProvider>
					<SkeletonTheme baseColor="#374151" highlightColor="#4B5563">
						<LoadingWrapper>
							<Layout>{children}</Layout>
							<Toaster
								toastOptions={{
									style: {
										background: '#202020',
										color: '#fff',
									},
								}}
							/>
						</LoadingWrapper>
					</SkeletonTheme>
				</NotificationsProvider>
			</ThemeProvider>
		</QueryClientProvider>
	)
}
export default MainProvider
