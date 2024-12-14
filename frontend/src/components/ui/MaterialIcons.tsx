import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'

import { TypeMaterialIconName } from '../../shared/types/icon.types'

interface IMaterialIcon {
	name: TypeMaterialIconName
	classname?: string
}

const MaterialIcon: FC<IMaterialIcon> = ({ name, classname }) => {
	const IconComponent = MaterialIcons[name]

	return <IconComponent className={classname} />
}
export default MaterialIcon
