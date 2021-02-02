import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Header.css'

class Header extends Component {

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div>
        <span className="user_name">
          Hi, {this.context.user.name}
        </span>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to='/login'>Login</Link>
        {' '}<br></br>
        <Link to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header className="main_header">
        <h1>
          <Link to='/'  className="app_title">
            Spaced Repetition
          </Link>
        </h1>
        <div className="links">
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
        </div>
        
      </header>
    );
  }
}

export default Header
