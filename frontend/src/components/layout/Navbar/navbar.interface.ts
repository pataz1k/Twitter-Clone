import { TypeMaterialIconName } from '../../../shared/types/icon.types'

export interface INavbar {
	items: INavbarItem[]
}

export interface INavbarItem {
	icon: TypeMaterialIconName
	title: string
	link: string
}
