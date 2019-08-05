import React, {Component} from 'react'
import {inject} from 'mobx-react'
import {Button} from 'antd'
import styles from './Dashboard.module.less'
import {toJS} from 'mobx'
import withRouter from 'react-router-dom/withRouter';

@inject('rootStore')
class Dashboard extends Component {
  handleClickNavigate() {
    this.props.history.push('/app/message/option1')
  }
  handleClickNavigateBack() {
    this.props.history.go(-1)
  }
  render() {
    return (
      <div>
        <span className={`test-global ${styles.test}`}>Dashboard</span>
        <Button
          style={{marginRight:'5px'}}
          type='primary'
          onClick={() => {
            this.handleClickNavigate()
          }}
        >
          路由跳转
        </Button>

        <Button
          type='primary'
          onClick={() => {
            this.handleClickNavigateBack()
          }}
        >
          路由回退
        </Button>
      </div>
    )
  }
}

export default withRouter(Dashboard)
