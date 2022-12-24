'use client'

import Link from 'next/link'
import { Card, Button } from 'semantic-ui-react'

type Props = {
  campaigns: string[]
}

export default function CampaignsList({ campaigns }: Props) {
  const campaignCards = campaigns.map((address) => ({
    header: address,
    description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
    fluid: true
  }))

  return (
    <>
      <Button
        as={Link}
        href="/campaigns/new"
        content="Create Campaign"
        icon="add circle"
        floated="right"
        primary
      />
      <Card.Group items={campaignCards} />
    </>
  )
}
