'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import { web3 } from '@crowd-coin/libs'
import Campaign from '@crowd-coin/ethereum/campaign'

type Props = {
  address: string
}

const formInitialState = {
  description: '',
  value: '',
  recipient: ''
}

export default function RequestForm({ address }: Props) {
  const router = useRouter()
  const [form, setForm] = useState(formInitialState)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    const campaign = Campaign(address)
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods
        .createRequest(
          form.description,
          web3.utils.toWei(form.value, 'ether'),
          form.recipient
        )
        .send({
          from: accounts[0]
        })
      router.push(`/campaigns/${address}/requests`)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error))
    }
    setLoading(false)
  }

  return (
    <>
      <Form onSubmit={handleSubmit} error={Boolean(errorMessage)}>
        <Form.Field>
          <label htmlFor="campaign">Description</label>
          <Input
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="campaign">Value in Ether</label>
          <Input
            type="number"
            label="ether"
            labelPosition="right"
            value={form.value}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, value: e.target.value }))
            }
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="campaign">Recipient</label>
          <Input
            value={form.recipient}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, recipient: e.target.value }))
            }
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMessage} />

        <Button primary loading={!!loading}>
          Create
        </Button>
      </Form>
    </>
  )
}
