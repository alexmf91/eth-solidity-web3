'use client'

import Link from 'next/link'
import { Menu } from 'semantic-ui-react'

export default function Header() {
  return (
    <Menu style={{ marginBlock: 20 }}>
      <Menu.Item as={Link} href="/">
        Crowd Coin
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item as={Link} href="/">
          Campaigns
        </Menu.Item>
        <Menu.Item as={Link} href="/campaigns/new">
          +
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
