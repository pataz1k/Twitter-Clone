import { useRouter } from 'next/router'
import { FC } from 'react'

import MaterialIcon from '../MaterialIcons'

const BackButton: FC = () => {
	const router = useRouter()
	return (
		<button onClick={router.back}>
			<MaterialIcon name="MdArrowBack" classname="size-6" />
		</button>
	)
}
export default BackButton
