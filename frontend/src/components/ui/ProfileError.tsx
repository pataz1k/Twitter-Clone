import { FC } from "react"
import MaterialIcon from "./MaterialIcons"

interface IProfileError {
    refetch: () => void
}
const ProfileError:FC<IProfileError> = ({refetch}) => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
			<div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden">
			  <div className="p-6">
				<div className="flex items-center space-x-2 text-red-400 mb-4">
				  <MaterialIcon name='MdError' classname='size-5'/>
				  <h2 className="text-xl font-semibold">Error Loading Profile</h2>
				</div>
				<p className="text-gray-300 mb-6">
				  Unfortunately, we couldn&apos;t load the profile data. This may be due to network or server issues.
				</p>
				<button 
				  onClick={() => refetch()} 
				  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
				>
				  <MaterialIcon name='MdRefresh' classname='mr-2 size-5' />
				  Try Again
				</button>
			  </div>
			</div>
		  </div>
  )
}
export default ProfileError