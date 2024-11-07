import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-loading-skeleton/dist/skeleton.css'
import Layout from '../components/layout/Layout'

import { AuthProvider } from './AuthProvider'
import { SkeletonTheme } from 'react-loading-skeleton'

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
				<SkeletonTheme baseColor='#4d4646'>
					<Layout>{children}</Layout>
				</SkeletonTheme>
			</AuthProvider>
		</QueryClientProvider>
	)
}
export default MainProvider
