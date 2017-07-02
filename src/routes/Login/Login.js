import { Button, Card, Form, Grid } from 'semantic-ui-react'
import React, { Component } from 'react'

import { RestClient } from '../../lib/clients/RestClient'

class Login extends Component {
  handleSubmit() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    RestClient.post('/users', { username, password })
  }

  render() {
    return (
      <div className="center-horizontal">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Card style={{ padding: 30 }}>
                <Card.Content header="Login" />
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Username</label>
                    <input placeholder="Username" id="username" />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input placeholder="Username" id="password" />
                  </Form.Field>
                  <Button type="submit">Submit</Button>
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
