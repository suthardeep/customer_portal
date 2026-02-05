import Spinner from '@/components/compound/spinner/Spinner'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/')({ component: App })

function App() {
  return (
    <div>

    <h1>Hi</h1>
    <Spinner />
    </div>
  )
}
