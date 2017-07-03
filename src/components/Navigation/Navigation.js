import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import React from 'react'

const Navigation = () => {
  return (
    <div>
      <Menu pointing fixed="top">
        <Link to="/">
          <Menu.Item link>Home</Menu.Item>
        </Link>
        <Link to="/register">
          <Menu.Item link>Register</Menu.Item>
        </Link>
      </Menu>
    </div>
  )
}

export default Navigation
