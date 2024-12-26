import { ChangeEvent, FC } from 'react'

import MaterialIcon from '../MaterialIcons'

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
	handleSelect: (isSelected: boolean) => void
}

const SearchField: FC<ISearchField> = ({
	searchTerm,
	handleSearch,
	handleSelect,
}) => {
	return (
		<div className="relative">
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<MaterialIcon name="MdSearch" classname="h-5 w-5 text-gray-400" />
			</div>
			<input
				type="text"
				className="block w-full pl-10 pr-3 py-2 border border-gray-800 rounded-md leading-5 bg-gray-900 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out sm:text-sm"
				placeholder="Search"
				value={searchTerm}
				onChange={handleSearch}
				onSelect={() => handleSelect(true)}
			/>
		</div>
	)
}

export default SearchField
