import {observable, action} from 'mobx'
import configRouter from '../routes/config'

class RootStore {
  @observable locale = 'en'
  @observable routes = configRouter

  @action changeRoutes(routes) {
    this.routes = routes
  }
}

export default new RootStore()
