import React, { Component } from 'react'
import Helmet from "react-helmet"

class Finance extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Helmet title="Finance page" />
        <h1>Finance stuff</h1>
      </div>
    )
  }
}

export default Finance
