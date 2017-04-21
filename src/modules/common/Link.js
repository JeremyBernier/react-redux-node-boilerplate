import React, { PropTypes } from 'react'
import { Link as LinkOriginal } from 'react-router'

class Link extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { children, ...other } = this.props

    if (other.to && typeof other.to === 'string' && other.to.indexOf('://') > -1) {
      return <a href={other.href || other.to} {...other}>{children}</a>
    }

    return <LinkOriginal {...other}>{children}</LinkOriginal>
  }
}

Link.propTypes = {
  className: PropTypes.string,
  children:  PropTypes.node,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  activeClassName: PropTypes.string,
  onClick: PropTypes.func,
};

export default Link
