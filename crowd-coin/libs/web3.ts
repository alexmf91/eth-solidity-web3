// https://docs.web3js.org/api/web3
import Web3 from 'web3'

let web3

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  console.log('Web3 browser instance')
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: 'eth_requestAccounts' })
  web3 = new Web3(window.ethereum)
} else {
  console.log('Web3 server instance')
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://goerli.infura.io/v3/d554970d906e482494a0dcdb1aa3819d'
  )
  web3 = new Web3(provider)
}

export default web3
