import { FC } from 'react'
import LinkButton from './LinkButton'

const NotAuth:FC = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-2xl mb-2'>You aren't auth!</h1>
        <LinkButton href={'/auth'} text='Login'/>
    </div>
  )
}

export default NotAuth