import { FC } from 'react'

interface IHeading {
	title: string
	className?: string
}
const Heading: FC<IHeading> = ({ title, className }) => {
	return (
		<h1
			className={`text-white font-semibold ${className} ${className?.includes('xl') ? '' : 'text-2xl'}`}
		>
			{title}
		</h1>
	)
}
export default Heading
