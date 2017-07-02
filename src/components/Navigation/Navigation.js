import { Menu } from 'semantic-ui-react'
import React from 'react'

const Navigation = () => {
  return (
    <div>
      <Menu pointing fixed="top">
        <Menu.Item link>Home</Menu.Item>
        <Menu.Item link>Login</Menu.Item>
      </Menu>
    </div>
  )
}

export default Navigation
