'use client'
import { Card } from 'semantic-ui-react'
import { web3 } from '@crowd-coin/libs'

type Props = {
  summary: {
    minimumContribution: string
    balance: string
    requestsCount: string
    approversCount: string
    manager: string
  }
}

export default function Summary({ summary }: Props) {
  const items = [
    {
      header: summary.manager,
      meta: 'Address of Manager',
      description:
        'The manager created this campaign and can create requests to withdraw money',
      style: { overflowWrap: 'break-word' }
    },
    {
      header: summary.minimumContribution,
      meta: 'Minimum Contribution (wei)',
      description:
        'You must contribute at least this much wei to become an approver'
    },
    {
      header: summary.requestsCount,
      meta: 'Number of Requests',
      description:
        'A request tries to withdraw money from the contract. Requests must be approved by approvers'
    },
    {
      header: summary.approversCount,
      meta: 'Number of Approvers',
      description: 'Number of people who have already donated to this campaign'
    },
    {
      header: web3.utils.fromWei(summary.balance, 'ether'),
      meta: 'Campaign Balance (ether)',
      description:
        'This balance is how much money this campaign has left to spend'
    }
  ]

  return <Card.Group items={items} />
}
