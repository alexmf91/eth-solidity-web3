import type { NextApiRequest, NextApiResponse } from 'next'
import factory from '@crowd-coin/ethereum/factory'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const campaigns = await factory.methods.getDeployedCampaigns().call()
  res.status(200).json(campaigns)
}
