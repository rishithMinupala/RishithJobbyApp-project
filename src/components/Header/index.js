import {withRouter, Link} from 'react-router-dom'
import {BsBriefcaseFill, BsBoxArrowRight} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const toLogin = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-cont">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>

      <ul className="header-options">
        <Link to="/" className="home-option">
          <li>
            <nav className="text-option">Home</nav>
          </li>
          <AiFillHome className="icon-style" />
        </Link>

        <Link to="/jobs" className="home-option">
          <li>
            <nav className="text-option">Jobs</nav>
          </li>
          <BsBriefcaseFill className="icon-style" />
        </Link>
        <li>
          <button
            className="header-button-small"
            type="button"
            onClick={toLogin}
          >
            <BsBoxArrowRight className="icon-style" />
          </button>
        </li>
      </ul>

      <button className="header-button" type="button" onClick={toLogin}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
