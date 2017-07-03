import { Button, Card, Form, Grid } from 'semantic-ui-react'
import React, { Component } from 'react'

import { AccountApi } from '../../lib/apis/AccountApi'

class Login extends Component {
  handleSubmit() {
    const name = document.getElementById('name').value
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    AccountApi.createAccount({ name, username, password }).then(result =>
      console.log('RESULT ', result)
    )
  }

  render() {
    return (
      <div className="center-horizontal">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Card style={{ padding: 30 }}>
                <Card.Content header="Register" />
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Name</label>
                    <input placeholder="Username" id="name" />
                  </Form.Field>
                  <Form.Field>
                    <label>Username</label>
                    <input placeholder="Username" id="username" />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input placeholder="Username" id="password" />
                  </Form.Field>
                  <Form.Field>
                    <label>Confirm Password</label>
                    <input placeholder="Username" />
                  </Form.Field>
                  <Button type="submit">Register</Button>
                </Form>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default Login
