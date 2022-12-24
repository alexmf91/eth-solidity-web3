'use client'

import { createCampaign } from '@crowd-coin/services/factory'
import { useState } from 'react'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import { useRouter } from 'next/navigation'

export default function CampaignForm() {
  const router = useRouter()
  const [minContribution, setMinContribution] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')
    try {
      await createCampaign(+minContribution)
      router.push('/')
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
          label="wei"
          labelPosition="right"
          value={minContribution}
          onChange={(e) => setMinContribution(e.target.value)}
        />
      </Form.Field>

      <Message error header="Oops!" content={errorMessage} />

      <Button loading={!!loading} primary>
        Create
      </Button>
    </Form>
  )
}
