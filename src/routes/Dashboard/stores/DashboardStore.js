import { action, observable } from 'mobx'

import Validator from 'validatorjs'

class DashboardStore {
  @observable
  form = {
    fields: {
      discName: {
        value: '',
        error: null,
        rule: 'required'
      },
      discLocation: {
        value: '',
        error: null
      },
      nameOnDisc: {
        value: '',
        error: null
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
    let { discName } = this.form.fields
    const validation = new Validator(
      { discName: discName.value },
      { discName: discName.rule }
    )
    this.form.meta.isValid = validation.passes()
    this.form.fields[field].error = validation.errors.first(field)
  }
}

export default new DashboardStore()
