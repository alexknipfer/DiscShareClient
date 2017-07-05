import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import React from 'react'

const Navigation = () => {
  return (
    <div>
      <Menu pointing inverted fixed="top" className="nav-main">
        <Link to="/">
          <Menu.Item link className="nav-links">
            Home
          </Menu.Item>
        </Link>
        <Link to="/register">
          <Menu.Item link className="nav-links">
            Register
          </Menu.Item>
        </Link>
      </Menu>
    </div>
  )
}

export default Navigation
