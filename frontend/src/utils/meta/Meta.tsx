import Head from 'next/head'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

import { onlyText } from '../string/clearText'

import { ISeo } from './meta.interface'
import { siteName, titleMerge } from '@/config/seo.config'
import logo from '@/public/favicon.ico'

const Meta: FC<ISeo> = ({ title, description, image, children }) => {
	const pathname = usePathname()
	const currentUrl = `${process.env.APP_URL}${pathname}`

	return (
		<>
			<Head>
				<title itemProp="headline">{titleMerge(title)}</title>

				{description ? (
					<>
						<meta
							itemProp="description"
							name="description"
							content={onlyText(description, 152)}
						/>
						<link rel="canonical" href={currentUrl} />
						<meta property="og:locale" content="en" />
						<meta property="og:title" content={titleMerge(title)} />
						<meta property="og:url" content={currentUrl} />
						<meta property="og:image" content={logo.src} />
						<meta property="og:site_name" content={siteName} />
						<meta
							property="og:description"
							content={onlyText(description, 197)}
						/>
					</>
				) : (
					<meta name="robots" content="index, follow" />
				)}
			</Head>
			{children}
		</>
	)
}
export default Meta
