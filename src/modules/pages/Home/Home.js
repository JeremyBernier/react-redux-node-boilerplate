import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

class Home extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <Helmet
          title="Homepage title goes here"
          meta={[
            { property: 'description', content: 'Description goes here'},
          ]}
        />
        <h1>Homepage</h1>
        <input type="text" />
      </div>
    )
  }
}

export default Home
