'use client'

import { Button, Table } from 'semantic-ui-react'

import Link from 'next/link'
import RequestRow from './RequestRow'

type Props = {
  address: string
  requests: any[]
  approversCount: string
  requestsCount: string
}

export default function RequestsList({
  address,
  requests,
  approversCount,
  requestsCount
}: Props) {
  return (
    <>
      <Button
        as={Link}
        href={`/campaigns/${address}/requests/new`}
        content="Add request"
        floated="right"
        primary
        style={{ marginBottom: 10 }}
      />
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Recipient</Table.HeaderCell>
            <Table.HeaderCell>Approval Count</Table.HeaderCell>
            <Table.HeaderCell>Approve</Table.HeaderCell>
            <Table.HeaderCell>Finalize</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {requests.map((request, index) => (
            <RequestRow
              key={JSON.stringify(requests)}
              id={index}
              address={address}
              request={request}
              approversCount={approversCount}
            />
          ))}
        </Table.Body>
      </Table>
      <div>Found {requestsCount} requests.</div>
    </>
  )
}
