import { Button, Form, Grid, Input, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'

import CenteredGrid from '../../components/CenteredGrid/CenteredGrid'
import { LocalStorage } from '../../utils/LocalStorage'
import LoginForm from './components/LoginForm'
import LoginMutation from '../../mutations/login'
import LoginStore from '../../stores/LoginStore'
import PaddedCard from '../../components/PaddedCard/PaddedCard'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { observer } from 'mobx-react'

@observer
class Login extends Component {
  render() {
    const { history } = this.props
    return (
      <LoginForm
        onSubmit={this.onSubmitForm}
        form={LoginStore.form}
        onChange={LoginStore.onFieldChange}
        history={history}
      />
    )
  }
}

export default Login

// @observer
// class Login extends Component {
//   @observable errorMessageVisible = false
//   @observable errorMessage = null

//   static propTypes = {
//     login: PropTypes.func
//   }

//   @action
//   displayErrMessage = err => {
//     this.errorMessageVisible = !this.errorMessageVisible
//     this.errorMessage = err
//   }

//   handleSubmit = async login => {
//     const username = document.getElementById('username').value
//     const password = document.getElementById('password').value

//     try {
//       const user = await login(username, password)
//       LocalStorage.saveToken(user.data.login)
//       this.props.history.push('/')
//     } catch (err) {
//       const { graphQLErrors } = err
//       this.displayErrMessage(graphQLErrors[0].message)
//     }
//   }

//   render() {
//     const { login } = this.props
//     return (
//       <CenteredGrid>
//         <Grid.Column mobile={14} computer={5}>
//           <PaddedCard fluid>
//             <h3>Login</h3>
//             <Form
//               onSubmit={() => this.handleSubmit(login)}
//               error={this.errorMessageVisible}
//             >
//               <Form.Field>
//                 <label>Username</label>
//                 <Input id="username" required />
//               </Form.Field>
//               <Form.Field>
//                 <label>Password</label>
//                 <Input id="password" type="password" required />
//               </Form.Field>
//               <Message error content={this.errorMessage} />
//               <Button type="submit">Login</Button>
//             </Form>
//           </PaddedCard>
//         </Grid.Column>
//       </CenteredGrid>
//     )
//   }
// }

// export default graphql(LoginMutation, {
//   props: ({ mutate }) => ({
//     login: (username, password) => mutate({ variables: { username, password } })
//   })
// })(Login)
