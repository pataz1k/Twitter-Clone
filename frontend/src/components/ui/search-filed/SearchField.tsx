import { ChangeEvent, FC } from 'react'

import MaterialIcon from '../MaterialIcons'

import styles from './SearchField.module.scss'

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
	handleSelect: (isSelected: boolean) => void
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch,handleSelect }) => {
	return (
		<div className={styles.search}>
			<MaterialIcon name="MdSearch" />
			<input onSelect={() => handleSelect(true)} onBlur={() => handleSelect(false)} placeholder="Search" value={searchTerm} onChange={handleSearch} />
		</div>
	)
}
export default SearchField
