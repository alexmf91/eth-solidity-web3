'use client'

import { Button } from 'semantic-ui-react'

import Link from 'next/link'

type Props = {
  address: string
}

export default function ViewRequestsButton({ address }: Props) {
  return (
    <Button
      as={Link}
      href={`/campaigns/${address}/requests`}
      content="View Requests"
      primary
    />
  )
}
