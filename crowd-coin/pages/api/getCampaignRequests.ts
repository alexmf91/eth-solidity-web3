import type { NextApiRequest, NextApiResponse } from 'next'
import Campaign from '@crowd-coin/ethereum/campaign'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.address) {
    res.statusMessage = 'Address must be provided'
    res.status(400).end()
  }
  //TODO: Handle if address is not valid or campaign doesn't exist
  const campaign = Campaign(req.query.address as string)
  const requestsCount: string = await campaign.methods.getRequestsCount().call()
  const approversCount: string = await campaign.methods
    .getApproversCount()
    .call()

  const requests = await Promise.all(
    Array.from(Array(parseInt(requestsCount)).keys()).map((requestNum) => {
      return campaign.methods.requests(requestNum).call()
    })
  )

  res
    .status(200)
    .json({
      address: req.query.address,
      requests,
      requestsCount,
      approversCount
    })
}
