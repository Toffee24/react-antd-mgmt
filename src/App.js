import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import Loadable from 'react-loadable'
import 'moment/locale/zh-cn'
import {observer, Provider} from 'mobx-react'
import {configure} from 'mobx'
import rootStore from './stores/RootStore'
import {Loader} from './components'
import api from './service/api'
import './App.less'
import config from './utils/config'

global.Api = api
global.Config = config

configure({enforceActions: 'always'})

const loading = () => <Loader/>

const Login = Loadable({
  loading,
  loader: () => import('./pages/Login/Login')
})

const Main = Loadable({
  loading,
  loader: () => import('./Main')
})

const NotFound = Loadable({
  loading,
  loader: () => import('./pages/Error/NotFound')
})

@observer
class App extends React.Component {
  render() {
    return (
    <Provider rootStore={rootStore}>
      <Router>
        <Switch>
          <Route exact path='/' render={() => <Redirect to={`${config.adminBasePath}/dashboard`} push/>}/>
          <Route path='/login' component={Login}/>
          <Route path={config.adminBasePath} component={Main}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </Provider>
    )
  }
}

export default App
