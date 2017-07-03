import { Button, Card, Form, Grid } from 'semantic-ui-react'
import React, { Component } from 'react'

import { RestClient } from '../../lib/clients/RestClient'

class Login extends Component {
  handleSubmit() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    RestClient.post('/api/users/register', { username, password }).then(res =>
      console.log('RESULT ', res)
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
                    <input placeholder="Username" id="username" />
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
                    <input placeholder="Username" id="password" />
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
