const assert = require('assert')
const ganache = require('ganache') // ganache is used to create a local test network and accounts
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts
let factory
let campaignAddress
let campaign

beforeEach(async () => {
  // Get a list of all acounts
  accounts = await web3.eth.getAccounts()
  // Use one of those accounts to deploy the factory contract
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: '1500000' })
  // Use one of those accounts to deploy the campaign contract
  await factory.methods
    .createCampaign('100')
    .send({ from: accounts[0], gas: '1000000' })

  const campaignAddresses = await factory.methods.getDeployedCampaigns().call()

  campaignAddress = campaignAddresses[0]

  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress)
})

describe('Campaigns', () => {
  it('deploys a factory and a campaign contract', () => {
    console.log('in the test', factory.options.address)
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  })

  it('marks caller as the campaign manager', async () => {
    const manager = await campaign.methods.manager().call()
    assert.equal(manager, accounts[0])
  })

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods
      .contribute()
      .send({ value: '200', from: accounts[1] })
    const isContributor = await campaign.methods.approvers(accounts[1]).call()
    assert(isContributor)
  })

  it('requires a minimun contribution', async () => {
    try {
      await campaign.methods
        .contribute()
        .send({ value: '5', from: accounts[1] })

      assert(false)
    } catch (error) {
      assert(error)
    }
  })

  it('allows manager to make a payment request', async () => {
    await campaign.methods
      .createRequest('Buy batteries', '100', accounts[1])
      .send({ from: accounts[0], gas: '1000000' })

    const request = await campaign.methods.requests(0).call()

    assert.equal('Buy batteries', request.description)
  })

  it('processes request', async () => {
    const initialBalance = await web3.eth.getBalance(accounts[1])

    await campaign.methods
      .contribute()
      .send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') })

    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({ from: accounts[0], gas: '1000000' })

    await campaign.methods
      .approveRequest(0)
      .send({ from: accounts[0], gas: '1000000' })

    await campaign.methods
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: '1000000' })

    const finalBalance = await web3.eth.getBalance(accounts[1])
    const initialEthBalance = parseFloat(
      web3.utils.fromWei(initialBalance, 'ether')
    )
    const finalEthBalance = parseFloat(
      web3.utils.fromWei(finalBalance, 'ether')
    )

    // The assertion is felxible because maybe the gas could afect on the exact increment
    assert(finalEthBalance > initialEthBalance + 4.5)
  })
})
