import React, {Component} from 'react'
import {inject} from 'mobx-react'
import {Button} from 'antd'
import styles from './Dashboard.module.less'
import {toJS} from 'mobx'
import withRouter from 'react-router-dom/withRouter';

@inject('rootStore')
class Dashboard extends Component {
  constructor(props){
    super(props)
    console.log(props)
  }
  handleClick() {
    const root = toJS(this.props.rootStore.routes)
    root.pop()
    this.props.rootStore.changeRoutes(root)
  }
  handleClick2() {
    this.props.history.push('/app/message/option1')
  }
  render() {
    return (
      <div>
        <span className={`test-global ${styles.test}`}>Dashboard</span>
        <Button
          type='primary'
          onClick={() => {
            this.handleClick()
          }}
        >
          Link to profile
        </Button>
        <Button
          type='primary'
          onClick={() => {
            this.handleClick2()
          }}
        >
          hello
        </Button>
      </div>
    )
  }
}

export default withRouter(Dashboard)
