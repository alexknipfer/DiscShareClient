import React, { Component } from 'react'

import FormInput from '../../../utils/Forms/FormInput'
import { observer } from 'mobx-react'

@observer
class LoginForm extends Component {
  submit = e => {
    e.preventDefault()
    this.props.onSubmit()
  }
  render() {
    console.log('FORM: ', this.props.onChange)
    const { form, onChange } = this.props
    return (
      <form onSubmit={this.submit}>
        <FormInput
          type="email"
          value={form.fields.email.value}
          error={form.fields.email.error}
          onChange={onChange}
          placeholder="email"
        />
        <FormInput
          type="password"
          value={form.fields.password.value}
          error={form.fields.password.error}
          onChange={onChange}
          placeholder="password"
        />
        {form.meta.error &&
          <div>
            {form.meta.error}
          </div>}
        <input disabled={!form.meta.isValid} value="Continue" type="submit" />
      </form>
    )
  }
}

export default LoginForm
