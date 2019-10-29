import React, { Component, PropTypes } from 'react'
import Header from './common/header/HeaderContainer'
import Footer from './common/footer/FooterContainer'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { throttle } from 'lodash'

import { mobileDeviceType } from '../client/Device'

const { BROWSER } = process.env

if (process.env.BROWSER) {
  require('../style/index.scss')
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yOffset: 0,
    }
    this.setYOffset = throttle(this.setYOffset.bind(this), 100)
    this.setWindowWidth = throttle(this.setWindowWidth.bind(this), 100)
  }

  setYOffset() {
    this.setState({
      yOffset: window.pageYOffset
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.setYOffset, false)
    window.addEventListener('resize', this.setWindowWidth, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.setYOffset, false)
    window.removeEventListener('resize', this.setWindowWidth, false)
  }

  setWindowWidth() {
    this.props.setScreenWidth(window.innerWidth)
  }
  
  render() {
    const { windowWidth } = this.props

    return (
      <div id="container">
        <Header />
        <div id="container-page">
          {React.cloneElement(this.props.children, {})}
        </div>
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node,
}

App.defaultProps = {
}

export default App
