import Link from 'next/link'
import { RequestForm } from './components'

//TODO: Type with next params type once they solve it. Issue ref: https://github.com/vercel/next.js/issues/41884
type Props = { params: { address: string } }

export default async function CreateRequestPage({
  params: { address }
}: Props) {
  return (
    <>
      <h3>Create a Request</h3>
      <Link href={`/campaigns/${address}/requests`}>Back</Link>
      <RequestForm address={address} />
    </>
  )
}
