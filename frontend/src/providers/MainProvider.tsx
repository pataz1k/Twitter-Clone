import { FC, PropsWithChildren } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { QueryClient, QueryClientProvider } from 'react-query'

import Layout from '../components/layout/Layout'

import { AuthProvider } from './AuthProvider'

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
				<SkeletonTheme baseColor="#4d4646" highlightColor="#fff">
					<Layout>{children}</Layout>
				</SkeletonTheme>
			</AuthProvider>
		</QueryClientProvider>
	)
}
export default MainProvider
