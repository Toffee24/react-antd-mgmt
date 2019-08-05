import React, {Component} from 'react'
import {Layout} from 'antd'
import {SiderCustom, HeaderCustom} from './components'
import Routes from './routes'
import {inject, observer} from 'mobx-react'
import {signOut} from './utils/tools'

const {Content} = Layout

@inject('rootStore')
@observer
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      pathname: this.props.location.pathname
    }
    this._breadcrumbList = []
    this.updateTitle(this.props)
  }


  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this._breadcrumbList = []
      this.updateTitle(nextProps)
      // this.renderBreadcrumbList(routesConfig, nextProps)
    }
  }

  onCollapseChange = () => {
    this.setState(state => ({
      collapsed: !state.collapsed,
    }))
  }

  onSignOut = () => {
    signOut()
    this.props.history.push('/login')
  }

  updateTitle = (props) => {
    setTimeout(() => {
      if (props.location.title) {
        document.title = props.location.title
      }
    }, 0)
  }

  render() {
    const {collapsed} = this.state
    return (
      <Layout id='components-layout'>
        <SiderCustom collapsed={collapsed}/>
        <Layout>
          <HeaderCustom
            user={{
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              userName: 'Guest'
            }}
            collapased={collapsed}
            onCollapseChange={this.onCollapseChange}
            onSignOut={this.onSignOut}/>
          <Content
            style={{
              position: 'relative', margin: '12px 16px', padding: 24, background: '#fff', minHeight: 280
            }}>
            <Routes rootStore={this.props.rootStore} routes={this.props.rootStore.routes}/>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Main
