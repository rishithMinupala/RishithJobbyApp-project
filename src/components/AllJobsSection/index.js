import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import FiltersSection from '../FiltersSection'
import JobCard from '../JobCard'

import './index.css'

const renderStatus = {
  intial: 'INTIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class AllJobsSection extends Component {
  state = {
    search: '',
    employmentType: '',
    minPackage: '',
    status: renderStatus.intial,
    jobsList: [],
    jobsCount: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({status: renderStatus.inProgress})
    const {search, minPackage, employmentType} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minPackage}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const UpdateData = data.jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
      }))
      this.setState({
        status: renderStatus.success,
        jobsList: UpdateData,
        jobsCount: data.total,
      })
    } else {
      this.setState({status: renderStatus.failure})
    }
  }

  changeSearch = event => {
    this.setState({search: event.target.value})
  }

  searchJobs = () => {
    this.getJobs()
  }

  retryFetch = () => {
    this.getJobs()
  }

  ChangeEmployment = activeEmployment => {
    console.log(activeEmployment)
    this.setState({employmentType: activeEmployment}, this.getJobs)
  }

  ChangeSalary = activeSalary => {
    this.setState({minPackage: activeSalary}, this.getJobs)
  }

  renderInProgress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="no-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="no-image"
      />
      <h1 className="failure head">Oops! Something Went Wrong</h1>
      <p className="no-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-button" type="button" onClick={this.retryFetch}>
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {jobsList, jobsCount} = this.state

    const noJobs = (
      <div className="no-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-image"
        />
        <h1 className="no-head">No Jobs Found</h1>
        <p className="no-para">We could not find any jobs. Try other filters</p>
      </div>
    )
    return jobsCount === 0 ? (
      noJobs
    ) : (
      <div className="success">
        {jobsList.map(job => (
          <JobCard jobDetails={job} key={job.id} />
        ))}
      </div>
    )
  }

  renderSwitch = () => {
    const {status} = this.state
    switch (status) {
      case renderStatus.success:
        return this.renderSuccess()
      case renderStatus.inProgress:
        return this.renderInProgress()
      case renderStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobRoute-cont">
        <FiltersSection
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          changeEmploymentType={this.ChangeEmployment}
          changeSalary={this.ChangeSalary}
        />
        <div className="jobs-cont">
          <div className="input-cont-jobs">
            <input
              type="search"
              className="input-style-jobs"
              onChange={this.changeSearch}
              placeholder="Search"
            />
            <button
              type="button"
              data-testid="searchButton"
              onClick={this.searchJobs}
              className="search-button"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderSwitch()}
        </div>
      </div>
    )
  }
}

export default AllJobsSection
