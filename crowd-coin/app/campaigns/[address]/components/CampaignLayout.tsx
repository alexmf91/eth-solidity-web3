'use client'

import { Grid } from 'semantic-ui-react'

export default function CampaignLayout({
  children
}: {
  children: React.ReactNode[]
}) {
  return (
    <>
      {children[0]}
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{children[1]}</Grid.Column>
          <Grid.Column width={6}>{children[2]}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>{children[3]}</Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
