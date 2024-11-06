import Link from 'next/link'
import { FC } from 'react'

interface ILinkButton {
    text: string
    href: string
} 

const LinkButton:FC<ILinkButton> = ({text,href}) => {
  return (
    <Link className='bg-blue-500 p-2 px-4 rounded-2xl hover:bg-blue-700 transition-colors' href={href}>{text}</Link>
  )
}

export default LinkButton