import { Icon, Menu } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'

import { Link } from 'react-router-dom'
import { LocalStorage } from '../../utils/LocalStorage'
import MenuOverlay from '../MenuOverlay'
import { Nav } from './styles'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const MobileMenuItem = styled(({ visible, ...rest }) => (
  <Menu.Item {...rest} />
))`
  @media (min-width: 700px) {
    display: none !important;
  }
  display: ${props => (props.visible ? 'none !important' : 'initial')};
`

@observer
class Navigation extends Component {
  @observable showMenu = false
  @observable auth = false

  componentWillMount() {
    const token = LocalStorage.loadToken()
    if (token !== null) this.authorize()
  }

  logout = () => {
    LocalStorage.deleteToken()
    this.props.history.push('/login')
  }

  @action
  authorize = () => {
    this.auth = true
  }

  @action
  triggerMenu = () => {
    this.showMenu = !this.showMenu
  }

  render() {
    return this.auth ? this.renderUserNav() : this.renderVisitorNav()
  }

  renderVisitorNav = () => {
    return (
      <div>
        <MenuOverlay open={this.showMenu} triggerClose={this.triggerMenu} />
        <Nav pointing inverted fixed="top">
          <Menu.Item link>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to="/register">Register</Link>
          </Menu.Item>

          <Menu.Item link>
            <Link to="/login">Login</Link>
          </Menu.Item>

          <MobileMenuItem
            link
            position="right"
            onClick={this.triggerMenu}
            visible={this.showMenu}
          >
            <Icon name="bars" />
          </MobileMenuItem>
        </Nav>
      </div>
    )
  }

  renderUserNav = () => {
    const { user: { profileImage } } = this.props
    const { push } = this.props.history

    return (
      <div>
        <MenuOverlay open={this.showMenu} triggerClose={this.triggerMenu} />
        <Nav pointing inverted stackable fixed="top">
          <Menu.Item link onClick={() => push('/editAccount')}>
            <img
              src={profileImage}
              alt="profile-img"
              style={{ borderRadius: '50%' }}
            />
          </Menu.Item>

          <Menu.Item link onClick={() => push('/')}>
            Home
          </Menu.Item>

          <Menu.Item link onClick={() => push('/dashboard')}>
            Dashboard
          </Menu.Item>

          <Menu.Item link onClick={this.logout} position="right">
            Logout
          </Menu.Item>
          <MobileMenuItem
            link
            position="right"
            onClick={this.triggerMenu}
            visible={this.showMenu}
          >
            <Icon name="bars" />
          </MobileMenuItem>
        </Nav>
      </div>
    )
  }
}

export default Navigation
