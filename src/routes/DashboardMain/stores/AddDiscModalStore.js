import { action, observable } from 'mobx'

class AddDiscModalStore {
  @observable file = null

  @action
  toggleFormLoad = () => {
    this.formLoading = !this.formLoading
  }

  @action
  updateFile = file => {
    this.file = file
  }
}

export default new AddDiscModalStore()
