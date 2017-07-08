import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class Navigation extends Component {
  render() {
    return this.props.auth ? this.renderUserNav() : this.renderVisitorNav()
  }

  renderVisitorNav = () => {
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
          <Link to="/login">
            <Menu.Item link className="nav-links">
              Login
            </Menu.Item>
          </Link>
        </Menu>
      </div>
    )
  }

  renderUserNav = () => {
    return (
      <div>
        <Menu pointing inverted fixed="top" className="nav-main">
          <Link to="/">
            <Menu.Item link className="nav-links">
              Home
            </Menu.Item>
          </Link>
          <Link to="/login">
            <Menu.Item link className="nav-links">
              Logout
            </Menu.Item>
          </Link>
        </Menu>
      </div>
    )
  }
}

export default Navigation
