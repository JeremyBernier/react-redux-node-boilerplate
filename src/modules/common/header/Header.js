import React, { Component, PropTypes } from 'react'
import Link from '../Link'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header className="main-header">
        <nav className="nav">
          <ul className="menu-items">
            <li>
              <Link to="/" className="logo-link">
                Home
              </Link>
            </li>
            <li><Link to="/sell" activeClassName="active">Sell</Link></li>
            <li><Link to="/finance" activeClassName="active">Finance</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header
