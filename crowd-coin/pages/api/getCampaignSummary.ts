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
  //TODO: Hanlde if address is not valid or campaign doesn't exist
  const campaign = Campaign(req.query.address as string)
  const summary = await campaign.methods.getSummary().call()
  /* When a method returns more than one value, it returns an object
   of array shape {"0": address, "1": balance}.
   So we are taking care of this kind of translation layer */
  res.status(200).json({
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4]
  })
}
