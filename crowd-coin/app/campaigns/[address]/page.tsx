import {
  CampaignLayout,
  Summary,
  ContributeForm,
  ViewRequestsButton
} from './components'

const getCampaignSummary = async (address: string) => {
  const campaigns = await fetch(
    `http://localhost:3000/api/getCampaignSummary?address=${address}`
  )
  return campaigns.json()
}
//TODO: Type with next params type once they solve it. Issue ref: https://github.com/vercel/next.js/issues/41884
type Props = { params: { address: string } }

export default async function CampaignPage({ params: { address } }: Props) {
  const summary = await getCampaignSummary(address)

  return (
    <CampaignLayout>
      <h1>Campaign details</h1>
      <Summary summary={summary} />
      <ContributeForm address={address} />
      <ViewRequestsButton address={address} />
    </CampaignLayout>
  )
}
