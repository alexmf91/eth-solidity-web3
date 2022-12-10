'use client'

import { useEffect } from 'react'
import factory from '@crowd-coin/ethereum/factory'

export default function CampaignsList({ items }: any) {
  useEffect(() => {
    async function getCampaigns() {
      const campaigns = await factory.methods.getDeployedCampaigns().call()
      console.log('Campaaaings', campaigns)
    }
    getCampaigns()
  }, [])

  return <h1>CampaignsList component {JSON.stringify(items)}</h1>
}
