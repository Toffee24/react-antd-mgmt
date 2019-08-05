import React, {Component, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Icon, Menu, Layout} from 'antd'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'

@inject('rootStore')
@observer
class SiderCustom extends Component {
  static propTypes = {
    collapsed: PropTypes.bool
  }

  static getDerivedStateFromProps(props, state) {
    if (props.collapsed !== state.collapsed || props.location.pathname !== SiderCustom.pathname) {
      SiderCustom.pathname = props.location.pathname
      SiderCustom.openKey = props.location.pathname.split('/').length <= 3 ? state.openKey : [props.location.pathname.replace(props.location.pathname.match(/\/.+(\/.+$)/)[1], '')]
      const config = SiderCustom.setMenuOpen(props,SiderCustom.openKey)
      return {
        collapsed: props.collapsed,
        ...config
      }
    }
    return null
  }

  static setMenuOpen = (props, openKey) => {
    const {pathname} = props.location
    return {
      openKey: props.collapsed ? [] : openKey,
      selectedKey: pathname
    }
  }

  static openKey = []
  static pathname = ''

  state = {
    openKey: [],
    selectedKey: '',
    collapsed: false
  }

  componentDidMount() {
    SiderCustom.openKey = [this.props.location.parentKey] || []
    SiderCustom.pathname = this.props.location.pathname
    const state = SiderCustom.setMenuOpen(this.props, SiderCustom.openKey)
    this.setState(state)
  }

  menuClick = e => {
    let config = {
      selectedKey: e.key,
      openKey: []
    }
    if(e.keyPath.length > 1) {
      config.openKey = this.state.openKey
    }
    this.setState({
      ...config
    })
  }

  openMenu = v => {
    SiderCustom.openKey = v
    this.setState({
      openKey: v
    })
  }

  renderMenuItem = item => {
    const {rootStore} = this.props
    const title = rootStore.locale !== 'en' ? item[rootStore.locale + 'Title'] || item.title : item.title
    return (
      <Menu.Item
        key={item.key}
      >
        <Link to={(item.path || item.key) + (item.query || '')}>
          {item.icon && <Icon type={item.icon}/>}
          <span className='nav-item'>{title}</span>
        </Link>
      </Menu.Item>
    )
  }

  renderSubMenu = item => {
    const {rootStore} = this.props
    const title = rootStore.locale !== 'en' ? item[rootStore.locale + 'Title'] || item.title : item.title
    return (
      <Menu.SubMenu
        key={item.key}
        title={
          <Fragment>
            {item.icon && <Icon type={item.icon}/>}
            <span className='nav-item'>{title}</span>
          </Fragment>
        }
      >
        {item.subs.map(item => this.renderMenuItem(item))}
      </Menu.SubMenu>
    )
  }

  render() {
    const routes = this.props.rootStore.routes
    return (
      <Layout.Sider
        width={240}
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className='logo'>丙晟科技</div>
        <Menu
          theme='dark'
          mode='inline'
          inlineCollapsed={this.props.collapsed}
          selectedKeys={[this.state.selectedKey]}
          openKeys={this.state.openKey}
          onClick={this.menuClick}
          onOpenChange={this.openMenu}
        >
          {routes.map(r => r.component ? this.renderMenuItem(r) : this.renderSubMenu(r))}
        </Menu>
      </Layout.Sider>
    )
  }
}

export default withRouter(SiderCustom)
