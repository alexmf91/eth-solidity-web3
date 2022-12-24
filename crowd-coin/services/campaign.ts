import { web3 } from '@crowd-coin/libs'
import Campaign from '@crowd-coin/ethereum/campaign'

export async function approveRequest(address: string, requestId: number) {
  try {
    const campaign = Campaign(address)
    const accounts = await web3.eth.getAccounts()

    await campaign.methods.approveRequest(requestId).send({
      from: accounts[0]
    })
  } catch (error) {
    throw Error(error instanceof Error ? error.message : String(error))
  }
}

export async function finalizeRequest(address: string, requestId: number) {
  try {
    const campaign = Campaign(address)
    const accounts = await web3.eth.getAccounts()

    await campaign.methods.finalizeRequest(requestId).send({
      from: accounts[0]
    })
  } catch (error) {
    throw Error(error instanceof Error ? error.message : String(error))
  }
}
