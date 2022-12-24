import { web3 } from '@crowd-coin/libs'
import factory from '@crowd-coin/ethereum/factory'

export async function createCampaign(minimumContribution: number) {
  try {
    const accounts = await web3.eth.getAccounts()

    await factory.methods.createCampaign(minimumContribution).send({
      from: accounts[0]
    })
  } catch (error) {
    throw Error(error instanceof Error ? error.message : String(error))
  }
}
