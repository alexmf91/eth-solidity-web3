import { web3 } from '@crowd-coin/libs'

import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  //@ts-ignore
  CampaignFactory.abi,
  process.env.CONTRACT_ADDRESS || process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
)

export default instance
