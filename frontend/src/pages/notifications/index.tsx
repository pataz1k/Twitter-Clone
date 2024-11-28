import { useRouter } from 'next/router'
import { FC } from 'react'
import toast, { Toast } from 'react-hot-toast'

const Notifications: FC = () => {
	const router = useRouter()

	const notify = () => {
		toast((t: Toast) => (
			<span onClick={() => router.push('/messages	')}>
				<h1>Test</h1>
				<button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
			</span>
		))
	}

	return (
		<div>
			<button
				className="rounded-2xl bg-slate-500 p-2 text-white"
				onClick={notify}
			>
				TEST NOTIFY
			</button>
		</div>
	)
}
export default Notifications
