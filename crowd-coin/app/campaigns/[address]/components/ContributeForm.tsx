'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import { web3 } from '@crowd-coin/libs'
import Campaign from '@crowd-coin/ethereum/campaign'

type Props = {
  address: string
}

export default function ContributeForm({ address }: Props) {
  const router = useRouter()
  const [minContribution, setMinContribution] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    const campaign = Campaign(address)
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(minContribution, 'ether')
      })
      router.replace(`/campaigns/${address}`)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error))
    }
    setLoading(false)
  }

  return (
    <Form onSubmit={handleSubmit} error={Boolean(errorMessage)}>
      <Form.Field>
        <label htmlFor="campaign">Minimum Contribution</label>
        <Input
          type="number"
          label="ether"
          labelPosition="right"
          value={minContribution}
          onChange={(e) => setMinContribution(e.target.value)}
        />
      </Form.Field>

      <Message error header="Oops!" content={errorMessage} />

      <Button primary loading={!!loading}>
        Contribute
      </Button>
    </Form>
  )
}
