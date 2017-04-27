import React, { Component } from 'react'
import Helmet from "react-helmet"

class Sell extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Helmet title="Sell page" />
        <h1>Sell page here</h1>
      </div>
    )
  }
}

export default Sell
