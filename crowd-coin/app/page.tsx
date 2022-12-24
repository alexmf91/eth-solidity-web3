import { CampaignsList } from './components'

const getCampaigns = async () => {
  const campaigns = await fetch('http://localhost:3000/api/getCampaigns')
  return campaigns.json()
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns()

  return (
    <div>
      <h3>Open Campaigns</h3>
      <CampaignsList campaigns={campaigns} />
    </div>
  )
}
