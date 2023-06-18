import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errMsg: '', loginFailure: false}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  LoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({loginFailure: false, errMsg: ''})
    const {history} = this.props
    history.replace('/')
  }

  submiForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.LoginSuccess(data.jwt_token)
    }
    if (response.status === 400) {
      const errMsg = data.error_msg
      this.setState({loginFailure: true, errMsg})
    }
  }

  render() {
    const {loginFailure, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-cont">
        <form className="login-card" onSubmit={this.submiForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-login"
          />
          <div className="user-card">
            <label htmlFor="username" className="label-style">
              USERNAME
            </label>
            <input
              id="username"
              className="input-style-login"
              placeholder="Username"
              type="text"
              onChange={this.changeUsername}
            />
          </div>
          <div className="user-card">
            <label htmlFor="password" className="label-style">
              PASSWORD
            </label>
            <input
              id="password"
              className="input-style-login"
              placeholder="Password"
              type="password"
              onChange={this.changePassword}
            />
          </div>
          <div className="but-cont">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
          {loginFailure && <p className="errMsg">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
