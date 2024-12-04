import { FC } from 'react'
import { format, isToday, isYesterday, formatDistanceToNow, differenceInHours } from 'date-fns'

interface ITimeItem {
  time: string
  textSize: 'sm' | 'xs'
}

const TimeItem: FC<ITimeItem> = ({ time, textSize}) => {
  const date = new Date(time)
  const now = new Date()

  const formatDate = () => {
    const hoursDifference = differenceInHours(now, date)

    if (hoursDifference < 24) {
      return formatDistanceToNow(date, { addSuffix: true })
    } else if (isToday(date)) {
      return `Today, ${format(date, 'h:mm a')}`
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, 'h:mm a')}`
    } else {
      return format(date, 'MMM d, yyyy, h:mm a')
    }
  }

  const fullDate = format(date, 'MMMM d, yyyy, h:mm a')

  return (
    <div 
      className={`text-gray-500 dark:text-gray-400 text-${textSize}`}
      title={fullDate}
      aria-label={`Posted on ${fullDate}`}
    >
      {formatDate()}
    </div>
  )
}

export default TimeItem

