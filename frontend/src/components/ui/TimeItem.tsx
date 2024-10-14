import { FC } from 'react'

const TimeItem: FC<{ time: string }> = ({ time }) => {
	const date = new Date(time)

	const localDateString = date.toLocaleString('ru-RU', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	})
	return <div>{localDateString}</div>
}
export default TimeItem
