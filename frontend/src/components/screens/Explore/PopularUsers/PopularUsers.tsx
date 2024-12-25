import { FC } from 'react'
import { useQuery } from 'react-query'
import Link from 'next/link'

import Heading from '@/components/ui/Heading'
import NotAuth from '@/components/ui/NotAuth'

import { IUser } from '@/shared/types/profile.types'

import { UserService } from '@/services/user.service'
import useUserStore from '@/stores/user.store'
import Skeleton from 'react-loading-skeleton'
import { getUserPageUrl } from '@/config/url.config'

interface IUsersResponse {
  success: boolean
  data: IUser[]
}

const PopularUsers: FC = () => {
  const { isAuth, accessToken } = useUserStore()

  const { isSuccess, data, isLoading, isError } = useQuery(
    ['get popular users'],
    () => UserService.getAll(accessToken),
    { select: ({ data }: { data: IUsersResponse }) => data, enabled: isAuth }
  )

  if (!isAuth) {
    return (
      <div className="w-full md:w-1/2 border border-zinc-700 rounded-lg p-4 mt-5">
        <Heading title="Most popular users" className="text-lg" />
        <div className="flex items-center justify-center h-full">
          <NotAuth />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full md:w-1/2 border border-zinc-700 rounded-lg p-4 mt-5">
        <Heading title="Most popular users" className="text-lg" />
        <h1 className="text-xl font-bold text-center m-5">
          Error loading popular users.
        </h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="w-full md:w-1/2 border border-zinc-700 rounded-lg p-4 mt-5">
        <Heading title="Most popular users" className="text-lg" />
        <Skeleton count={8} height={25} />
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="w-full md:w-1/2 border border-zinc-700 rounded-lg p-4 mt-5">
        <Heading title="Most popular users" className="text-lg" />
          {data?.data
            .sort((a, b) => b.followersCount - a.followersCount)
            .slice(0, 8)
            .map((user, index) => (
                <Link key={index} href={getUserPageUrl(user.username)} className="block hover:bg-gray-900 rounded-lg p-2 text-zinc-300 hover:text-white transition-colors">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{user.username}</span>
                    <span className="text-sm text-zinc-500">({user.followersCount} followers)</span>
                  </div>
                </Link>
            ))}
      </div>
    )
  }

  return null
}

export default PopularUsers

