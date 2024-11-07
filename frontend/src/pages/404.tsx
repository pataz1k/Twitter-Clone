import LinkButton from '@/components/ui/LinkButton'
import { FC } from 'react'

const NotFound:FC = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-5'>
        <h1 className='font-bold text-xl mb-2'>Page what you looking for is not found!</h1>
        <LinkButton text="Go to main page" href='/' />
    </div>
  )
}

export default NotFound