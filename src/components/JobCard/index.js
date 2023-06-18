import {Link} from 'react-router-dom'
import {BsBriefcaseFill, BsGeoAlt, BsStarFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    location,
    title,
    rating,
    jobDescription,
    packagePerAnnum,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="jobcard-link">
      <div className="card">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="logo-company"
          />
          <div className="title-cont">
            <h1 className="head">{title}</h1>
            <div className="rating-cont">
              <BsStarFill className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-cont">
          <ul className="ul-cont">
            <li className="details-li">
              <BsGeoAlt className="location" />
              <p className="li-para">{location}</p>
            </li>
            <li className="details-li">
              <BsBriefcaseFill className="location-2" />
              <p className="li-para">{employmentType}</p>
            </li>
          </ul>
          <li className="details-li">
            <p className="salary-para">{packagePerAnnum}</p>
          </li>
        </div>
        <div className="hr-cont">
          <hr className="hr-line" />
        </div>
        <div className="des-cont">
          <h1 className="des-head">Description</h1>
          <p className="des-para">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobCard
