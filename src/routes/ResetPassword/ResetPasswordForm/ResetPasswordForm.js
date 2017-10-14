import { Button, Form, Grid, Message } from 'semantic-ui-react'
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import { graphql } from 'react-apollo'
import queryString from 'query-string'

import ResetPasswordFormValidator from './ResetPasswordValidator'
import { CenteredCardGrid } from '../../../components/CenteredGrid'
import PaddedCard from '../../../components/PaddedCard'
import TextInput from '../../../lib/Forms/InputTypes/TextInput'

@observer
class ResetPasswordForm extends Component {
  render() {
    const { history } = this.props
    const { form, onFieldChange } = ResetPasswordFormValidator
    const { fields, meta } = form
    return (
      <CenteredCardGrid>
        <Grid.Column mobile={14} computer={5}>
          <PaddedCard fluid>
            <div>
              <h3>Reset Password</h3>
              <Form>
                <Form.Field>
                  <TextInput
                    id="password"
                    name="password"
                    value={fields.password.value}
                    errorMessage={fields.password.error}
                    onChange={onFieldChange}
                    placeholder="Password"
                    type="password"
                  />
                </Form.Field>
                <Form.Field>
                  <TextInput
                    id="confirmPassword"
                    name="confirmPassword"
                    value={fields.confirmPassword.value}
                    errorMessage={fields.confirmPassword.error}
                    onChange={onFieldChange}
                    placeholder="Confirm Password"
                    type="password"
                  />
                </Form.Field>
                {meta.error && <div>{meta.error}</div>}
                <Button disabled={!meta.isValid} type="submit">
                  Reset Password
                </Button>
              </Form>
            </div>
          </PaddedCard>
        </Grid.Column>
      </CenteredCardGrid>
    )
  }
}

export default ResetPasswordForm
