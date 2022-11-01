/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Web3 from 'web3'

window.ethereum?.request({ method: 'eth_requestAccounts' })

// https://docs.web3js.org/api/web3
const web3 = new Web3(window.ethereum || 'ws://some.local-or-remote.node:8546')

export default web3
