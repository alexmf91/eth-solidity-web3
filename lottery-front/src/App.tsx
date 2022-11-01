/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { SetStateAction, useEffect, useState } from 'react'
import { web3 } from '@app/libs'
import lottery from './lottery'

function App() {
  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [message, setMessage] = useState('')

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    try {
      const accounts = await web3.eth.getAccounts()

      setMessage('Waiting on transaction success..')

      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(inputValue, 'ether')
      })
      setMessage('You have been entered!')
    } catch (error) {
      setMessage(`Something went wrong. Try again later.${String(error)}`)
    }
  }

  const handlePickWinner = async () => {
    try {
      const accounts = await web3.eth.getAccounts()

      setMessage('Waiting on transaction success..')

      await lottery.methods.pickWinner().send({
        from: accounts[0]
      })
      setMessage('A winner has been picked!')
    } catch (error) {
      setMessage(`Something went wrong. Try again later.${String(error)}`)
    }
  }

  useEffect(() => {
    const getManager = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const managerAddress: string = await lottery.methods.manager().call()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const playersList: [] = await lottery.methods.getPlayers().call()
      const poolBalance: string = await web3.eth.getBalance(
        lottery.options.address
      )
      console.log('get manager', playersList, poolBalance)
      setManager(managerAddress)
      setPlayers(playersList)
      setBalance(poolBalance)
    }
    // eslint-disable-next-line no-console
    getManager().catch(console.error)
  }, [manager])

  return (
    <div className="App">
      <h1>Lottery Contract</h1>
      <p className="bg-cyan-200">
        This contract is mannaged by: {manager}. There are currently
        {players.length} people entered, competing to win
        {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
      <hr />
      <form onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label htmlFor="ether-input">
            Amount of ether to enter
            <input
              id="ether-input"
              type="number"
              value={inputValue}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit" className="border p-1">
          Enter
        </button>
      </form>
      <h2>{message}</h2>

      <hr />
      <h4>Ready to pick a winner?</h4>
      <button type="button" className="border p-1" onClick={handlePickWinner}>
        Pick Winner
      </button>
      <hr />
    </div>
  )
}

export default App
