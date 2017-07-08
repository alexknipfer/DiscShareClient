import { Button, Card, Form, Grid } from 'semantic-ui-react'
import React, { Component } from 'react'

import { AccountApi } from '../../lib/apis/AccountApi'

class EditAccount extends Component {
  handleSubmit = () => {
    const email = document.getElementById('email').value

    AccountApi.editAccount({ email })
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <Grid className="center-horizontal">
          <Grid.Row>
            <Grid.Column mobile={16} computer={10}>
              <Card fluid className="card-padding">
                <Form onSubmit={this.handleSubmit}>
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
                        <Form.Input placeholder={user.email} id="email" />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8}>
                      <Form.Field>
                        <label>Test Field</label>
                        <input type="password" id="password" />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8}>
                      <Form.Field>
                        <label>Test Field</label>
                        <input type="password" id="confirm-password" />
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
