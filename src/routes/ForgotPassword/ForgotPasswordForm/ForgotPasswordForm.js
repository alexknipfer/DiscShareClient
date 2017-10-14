import { Button, Form, Grid } from 'semantic-ui-react'
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ForgotPasswordValidator from './ForgotPasswordValidator'

import { CenteredCardGrid } from '../../../components/CenteredGrid'
import PaddedCard from '../../../components/PaddedCard'
import TextInput from '../../../lib/Forms/InputTypes/TextInput'

@observer
class ForgotPasswordForm extends Component {
  render() {
    const { form, onFieldChange } = ForgotPasswordValidator
    const { fields, meta } = form
    return (
      <CenteredCardGrid>
        <Grid.Column mobile={14} computer={5}>
          <PaddedCard fluid>
            <h3>Forgot Password</h3>
            <Form>
              <Form.Field>
                <TextInput
                  id="email"
                  name="email"
                  value={fields.email.value}
                  errorMessage={fields.email.error}
                  onChange={onFieldChange}
                  placeholder="Email"
                />
              </Form.Field>
              {meta.error && <div>{meta.error}</div>}
              <Button disabled={!meta.isValid} type="submit">
                Send Email
              </Button>
            </Form>
          </PaddedCard>
        </Grid.Column>
      </CenteredCardGrid>
    )
  }
}

export default ForgotPasswordForm
