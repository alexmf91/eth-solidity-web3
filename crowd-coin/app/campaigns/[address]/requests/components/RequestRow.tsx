'use client'

import { Button, Table } from 'semantic-ui-react'
import { web3 } from '@crowd-coin/libs'

import { approveRequest, finalizeRequest } from '@crowd-coin/services/campaign'
import type { Request } from '@crowd-coin/types'

type Props = {
  id: number
  address: string
  request: Request
  approversCount: string
}

export default function RequestRow({
  id,
  address,
  request,
  approversCount
}: Props) {
  const readyToFinalize =
    parseInt(request.approvalCount) > parseInt(approversCount) / 2

  const handleApprove = async () => {
    await approveRequest(address, id)
  }

  const handlefinalize = async () => {
    await finalizeRequest(address, id)
  }

  return (
    <Table.Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{request.description}</Table.Cell>
      <Table.Cell>{web3.utils.fromWei(request.value, 'ether')}</Table.Cell>
      <Table.Cell>{request.recipient}</Table.Cell>
      <Table.Cell>
        {request.approvalCount}/{approversCount}
      </Table.Cell>
      <Table.Cell>
        {!request.complete && (
          <Button color="green" basic onClick={handleApprove}>
            Approve
          </Button>
        )}
      </Table.Cell>
      <Table.Cell>
        {request.complete && (
          <Button color="teal" basic onClick={handlefinalize}>
            Finalize
          </Button>
        )}
      </Table.Cell>
    </Table.Row>
  )
}
