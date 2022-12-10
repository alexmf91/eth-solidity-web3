import factory from '@crowd-coin/ethereum/factory'

import CampaignsList from './components/CampaignList'

const getCampaigns = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call()
  return campaigns
}

export default async function Campaigns() {
  const campaigns = await getCampaigns()

  return (
    <div>
      <h1>Home Page app campaigns {JSON.stringify(campaigns)}</h1>
      <CampaignsList items={campaigns} />
    </div>
  )
}
