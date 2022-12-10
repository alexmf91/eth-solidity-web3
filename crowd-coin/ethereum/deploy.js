const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')

const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
  'suit journey opinion foil access boss sketch stadium random fence repeat dismiss',
  'https://goerli.infura.io/v3/d554970d906e482494a0dcdb1aa3819d'
)

const web3 = new Web3(provider)

const deploy = async () => {
  console.log('Calling deploy...')

  const [account] = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', account)

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: '1500000', from: account })

  console.log('Contract deployed to', result.options.address)

  provider.engine.stop()
}

deploy()
