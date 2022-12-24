import { web3 } from '@crowd-coin/libs'

import Campaign from './build/Campaign.json'

export default function getCampaignInstance(address: string) {
  return new web3.eth.Contract(Campaign.abi, address)
}
