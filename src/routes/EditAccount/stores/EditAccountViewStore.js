import { action, observable } from 'mobx'

class EditAccountViewStore {
  @observable successMessageVisible = false
  @observable formLoading = false
  @observable file = null
  @observable userToken

  @action
  displaySuccessMessage = () => {
    this.successMessageVisible = !this.successMessageVisible
    setTimeout(() => {
      this.successMessageVisible = !this.successMessageVisible
    }, 3000)
  }

  @action
  toggleFormLoad = () => {
    this.formLoading = !this.formLoading
  }

  @action
  updateFile = file => {
    this.file = file
  }
}

export default new EditAccountViewStore()
