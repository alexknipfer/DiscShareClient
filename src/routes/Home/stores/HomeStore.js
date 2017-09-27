import { action, observable } from 'mobx'

class HomeStore {
  @observable radius = 10

  @action updateRadius = miles => (this.radius = miles)

  get radius() {
    return this.radius
  }
}

export default new HomeStore()
