import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const status = {
  inProgress: 'INPROGRESS',
  intial: 'INTIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employList = []

class FiltersSection extends Component {
  state = {profileApiStatus: status.intial, profileDetails: {}}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileApiStatus: status.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const profileDataConvert = item => ({
        name: item.name,
        profileImageUrl: item.profile_image_url,
        shortBio: item.short_bio,
      })
      const profileData = profileDataConvert(data.profile_details)

      this.setState({
        profileApiStatus: status.success,
        profileDetails: profileData,
      })
    }
  }

  renderLine = () => (
    <div className="line-cont">
      <hr className="filter-line" />
    </div>
  )

  renderInProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retryFetch = () => {
    this.getProfile()
  }

  renderFailure = () => (
    <button type="button" className="retry-button" onClick={this.retryFetch}>
      Retry
    </button>
  )

  renderSuccess = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-content">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-head">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  renderSalary = () => {
    const {changeSalary, salaryRangesList} = this.props

    const changeSalaryOption = event => {
      changeSalary(event.target.value)
    }

    return (
      <div className="salary-cont">
        <h1 className="salary-para">Salary Range</h1>
        <ul className="items-list-ul">
          {salaryRangesList.map(salary => (
            <li className="salary-options" key={salary.salaryRangeId}>
              <input
                className="salary-input"
                type="radio"
                value={salary.salaryRangeId}
                id={salary.salaryRangeId}
                onChange={changeSalaryOption}
                name="SalaryOption"
              />
              <label htmlFor={salary.salaryRangeId} className="salary-label">
                {salary.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderEmployment = () => {
    const {changeEmploymentType, employmentTypesList} = this.props

    const changeType = event => {
      if (event.target.checked) {
        employList.push(event.target.value)
      } else {
        const index = employList.indexOf(event.target.value)
        employList.splice(index, 1)
      }
      changeEmploymentType(employList.join(','))
    }

    return (
      <div className="employment-cont">
        <h1 className="employment-para">Type of Employment</h1>
        <ul className="items-list-ul">
          {employmentTypesList.map(type => (
            <li className="employment-options" key={type.employmentTypeId}>
              <input
                type="checkbox"
                id={type.employmentTypeId}
                value={type.employmentTypeId}
                className="checkbox-style"
                onChange={changeType}
              />
              <label
                htmlFor={type.employmentTypeId}
                className="employment-label"
              >
                {type.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderProfileSwitch = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case status.inProgress:
        return this.renderInProgress()
      case status.success:
        return this.renderSuccess()
      case status.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="filters-cont">
        <div className="profile-cont">{this.renderProfileSwitch()}</div>
        {this.renderLine()}
        {this.renderEmployment()}
        {this.renderLine()}
        {this.renderSalary()}
      </div>
    )
  }
}
export default FiltersSection
