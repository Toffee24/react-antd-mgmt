import React, {Component, Fragment} from 'react'
import {Avatar, Layout, Icon, Menu, Breadcrumb} from 'antd'
import {Link, withRouter} from 'react-router-dom'
import styles from './HeaderCustom.module.less'
import PropTypes from 'prop-types'
import {observer, inject} from 'mobx-react'

const {Header} = Layout

@inject('rootStore')
@observer
class HeaderCustom extends Component {
  constructor(props) {
    super(props)
    this._breadcrumbList = []
    const routes = this.props.rootStore.routes
    this.renderBreadcrumbList(routes, this.props)
  }
  static propTypes = {
    user: PropTypes.object,
    collapsed: PropTypes.bool,
    onCollapseChange: PropTypes.func,
    onSignOut: PropTypes.func
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this._breadcrumbList = []
      const routes = this.props.rootStore.routes
      this.renderBreadcrumbList(routes, nextProps)
    }
  }

  renderBreadcrumbList = (routes, props) => {
    const pathname = props.location.pathname
    for (let route of routes) {
      if (route.key === pathname) {
        if (route.parentKey) {
          const parentItem = this.props.rootStore.routes.find(r => r.key === route.parentKey)
          this._breadcrumbList.push({
            key: parentItem.key,
            title: parentItem.title,
            icon: parentItem.icon
          })
        }
        this._breadcrumbList.push({
          title: route.title,
          key: route.key,
          icon: route.icon
        })
      } else if (route.subs) {
        this.renderBreadcrumbList(route.subs, props)
      }
    }
  }

  handleClickMenu = (e) => {
    e.key === 'SignOut' && this.props.onSignOut()
  }

  render() {
    const {location} = this.props
    return (
      <Header className={styles.header}>
        <div
          className={styles.button}
          onClick={this.props.onCollapseChange}
        >
          <Icon
            className={styles.trigger}
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          />
        </div>

        <Breadcrumb style={{margin: '15px 16px',flexGrow: 1}}>
            {
              location.pathname !== '/app/dashboard' &&
              <Breadcrumb.Item>
                <Link to='/app/dashboard' className='breadcrumb-link'>
                  <Icon type='dashboard'/>
                  <span>Dashboard</span>
                </Link>
              </Breadcrumb.Item>
            }
            {this._breadcrumbList.map((item, index) => {
              return (
                <Breadcrumb.Item key={index}>
                  {item.key ?
                    <Link to={item.key} className='breadcrumb-link'>
                      {item.icon && <Icon type={item.icon}/>}
                      <span>{item.title}</span>
                    </Link> :
                    <Fragment>
                      {item.icon && <Icon type={item.icon}/>}
                      <span>{item.title}</span>
                    </Fragment>
                  }
                </Breadcrumb.Item>)
            })}
          </Breadcrumb>


        <div className={styles['right-container']}>
          <Menu
            mode='horizontal'
            theme='light'
            onClick={this.handleClickMenu}
          >
            <Menu.SubMenu
              key='avatar'
              title={
                <Fragment>
                  <span style={{color: 'rgb(153, 153, 153)', marginRight: 4}}>Hi,</span>
                  <span>{this.props.user.userName}</span>
                  <Avatar
                    style={{marginLeft: 8}}
                    src={this.props.user.avatar}
                  />
                </Fragment>}
            >
              <Menu.Item key='SignOut'>
                退出登录
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </Header>
    )
  }
}

export default withRouter(inject('rootStore')(HeaderCustom))
