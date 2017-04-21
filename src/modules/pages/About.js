import React, { Component } from 'react'
import Helmet from "react-helmet"

class About extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Helmet title="About page" />
        <h1>About this amazing site</h1>
      </div>
    )
  }
}

export default About
