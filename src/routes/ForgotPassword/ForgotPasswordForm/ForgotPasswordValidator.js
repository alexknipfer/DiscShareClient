import { action, observable } from 'mobx'

import Validator from 'validatorjs'

class ForgotPasswordValidator {
  @observable
  form = {
    fields: {
      email: {
        value: '',
        error: null,
        rule: 'required|email'
      }
    },
    meta: {
      isValid: false,
      error: null
    }
  }

  @action
  onFieldChange = (field, value) => {
    this.form.fields[field].value = value
    let { email } = this.form.fields
    const validation = new Validator(
      { email: email.value },
      { email: email.rule }
    )
    this.form.meta.isValid = validation.passes()
    this.form.fields[field].error = validation.errors.first(field)
  }
}

export default new ForgotPasswordValidator()
