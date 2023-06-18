/* eslint-disable react/jsx-no-comment-textnodes */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  BsBriefcaseFill,
  BsGeoAlt,
  BsStarFill,
  BsBoxArrowUpRight,
} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarItemCard from '../SimilarItemsCard'
import './index.css'

const renderStatus = {
  intial: 'INTIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {status: renderStatus.intial, jobDetails: {}, similarItems: []}

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    this.setState({status: renderStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
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
      const convertData = item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        location: item.location,
        rating: item.rating,
        jobDescription: item.job_description,
        skills: item.skills,
        lifeAtCompany: item.life_at_company,
        packagePerAnnum: item.package_per_annum,
        title: item.title,
        companyWebsiteUrl: item.company_website_url,
      })
      const jobDetails = convertData(data.job_details)
      const similarItems = data.similar_jobs.map(item => convertData(item))
      this.setState({status: renderStatus.success, jobDetails, similarItems})
    } else {
      this.setState({status: renderStatus.failure})
    }
  }

  renderSuccess = () => {
    const {jobDetails, similarItems} = this.state

    const {
      companyLogoUrl,
      title,
      rating,
      location,
      skills,
      lifeAtCompany,
      jobDescription,
      employmentType,
      packagePerAnnum,
      companyWebsiteUrl,
    } = jobDetails

    return (
      <>
        <div className="jobItem-card">
          <div className="jobItem-logo-cont">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="jobItem-logo"
            />
            <div className="jobItem-title-cont">
              <h1 className="jobItem-head">{title}</h1>
              <div className="jobItem-rating-cont">
                <BsStarFill className="jobItem-star" />
                <p className="jobItem-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="jobItem-details-cont">
            <ul className="jobItem-ul-cont">
              <li className="jobItem-details-li">
                <BsGeoAlt className="jobItem-location" />
                <p className="jobItem-li-para">{location}</p>
              </li>
              <li className="jobItem-details-li">
                <BsBriefcaseFill className="jobItem-location-2" />
                <p className="jobItem-li-para">{employmentType}</p>
              </li>
            </ul>
            <li className="jobItem-details-li">
              <p className="jobItem-salary-para">{packagePerAnnum}</p>
            </li>
          </div>
          <div className="jobItem-line-cont">
            <hr className="jobItem-line" />
          </div>

          <div className="des-para-header">
            <h1 className="jobItem-des-head">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              className="jobItem-link"
              rel="noreferrer"
            >
              Visit <BsBoxArrowUpRight className="jobItem-arrow-icon" />
            </a>
          </div>
          <div className="jobItem-description">
            <p className="jobItem-para">{jobDescription}</p>
          </div>
          <div className="jobItem-skills-cont">
            <h2 className="jobItem-skills-head">Skills</h2>
            <div className="jobItem-skills">
              {skills.map(image => (
                <div className="jobItems-skill" key={image.name}>
                  <img
                    src={image.image_url}
                    alt={image.name}
                    className="skillsImage"
                  />
                  <p className="skill-name">{image.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="life-at-company-cont">
            <h1 className="life-head">Life at Company</h1>
            <div className="life-at-company">
              <p className="jobItem-life-para">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.image_url}
                alt="life at company"
                className="life_at_image"
              />
            </div>
          </div>
        </div>
        <div className="similarItems-cont">
          <h1 className="similarItems-head">Similar Jobs</h1>
          <div className="similarJobs">
            {similarItems.map(job => (
              <SimilarItemCard details={job} key={job.id} />
            ))}
          </div>
        </div>
      </>
    )
  }

  retryFetch = () => {
    this.getItemDetails()
  }

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

  renderInprogress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSwitch = () => {
    const {status} = this.state

    switch (status) {
      case renderStatus.success:
        return this.renderSuccess()
      case renderStatus.inProgress:
        return this.renderInprogress()

      case renderStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobItem-container">
        <Header />
        <div className="jobItem-card-container">{this.renderSwitch()}</div>
      </div>
    )
  }
}
export default JobItemDetails
