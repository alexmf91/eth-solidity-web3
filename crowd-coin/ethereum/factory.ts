import { web3 } from '@crowd-coin/libs'

import CampaignFactory from './build/CampaignFactory.json'

console.log('CampaignFactory.abi', CampaignFactory.abi)
const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  process.env.CONTRACT_ADDRESS || process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
)

export default instance
