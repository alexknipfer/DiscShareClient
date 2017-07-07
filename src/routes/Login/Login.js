import { Button, Card, Form, Grid, Message } from 'semantic-ui-react'
import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <div className="center-horizontal">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Card style={{ padding: 30, width: '350px' }}>
                <Card.Content header="Login" />
                <Form>
                  <Form.Field>
                    <label>Email</label>
                    <input type="text" id="email" required />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input type="password" id="password" required />
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
