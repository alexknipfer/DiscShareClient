import { Button, Card, Form, Grid } from 'semantic-ui-react'
import React, { Component } from 'react'

class EditAccount extends Component {
  render() {
    const { user } = this.props
    return (
      <div>
        <Grid className="center-horizontal">
          <Grid.Row>
            <Grid.Column mobile={16} computer={10}>
              <Card fluid style={{ padding: '30px' }}>
                <Form>
                  <Grid>
                    <Grid.Column mobile={16} computer={16}>
                      <h3>Edit Account</h3>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8}>
                      <Form.Field>
                        <label>First Name</label>
                        <input type="text" id="firstName" />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8}>
                      <Form.Field>
                        <label>Location</label>
                        <input type="text" id="location" />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8}>
                      <Form.Field>
                        <label>Username</label>
                        <Form.Input placeholder={user.username} disabled />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8}>
                      <Form.Field>
                        <label>Email</label>
                        <Form.Input placeholder={user.email} />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8}>
                      <Form.Field>
                        <label>Password</label>
                        <input type="password" id="password" required />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8}>
                      <Form.Field>
                        <label>Confirm Password</label>
                        <input type="password" id="confirm-password" required />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Button type="submit">Submit</Button>
                    </Grid.Column>
                  </Grid>
                </Form>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default EditAccount
