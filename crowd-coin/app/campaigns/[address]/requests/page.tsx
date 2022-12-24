import { RequestsList } from './components'

const getCampaignRequests = async (address: string) => {
  const campaignRequests = await fetch(
    `http://localhost:3000/api/getCampaignRequests?address=${address}`
  )
  return campaignRequests.json()
}

type Props = { params: { address: string } }

export default async function CampaignRequestsPage({
  params: { address }
}: Props) {
  const { requests, approversCount, requestsCount } = await getCampaignRequests(address)

  return (
    <>
      <h1>Campaign Requests</h1>
      <RequestsList
        address={address}
        requests={requests}
        approversCount={approversCount}
        requestsCount={requestsCount}
      />
    </>
  )
}
