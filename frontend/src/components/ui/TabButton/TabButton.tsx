import { FC } from 'react'

interface TabButtonProps {
	active: boolean
	onClick: () => void
	children: React.ReactNode
}

export const TabButton: FC<TabButtonProps> = ({
	active,
	onClick,
	children,
}) => (
	<button
		onClick={onClick}
		className={`
			px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
			${
				active
					? 'bg-blue-600 text-white shadow-lg'
					: 'text-gray-400 hover:text-white hover:bg-gray-700'
			}
		`}
		aria-pressed={active}
	>
		{children}
	</button>
)
