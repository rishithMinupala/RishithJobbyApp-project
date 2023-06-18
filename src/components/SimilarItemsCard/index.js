import {BsStarFill, BsGeoAlt, BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarItemCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    title,
    rating,
    employmentType,
    location,
    jobDescription,
  } = details

  return (
    <div className="similarItem-card">
      <div className="similarItem-logo-cont">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similarItem-logo"
        />
        <div className="similarItem-title-cont">
          <h1 className="similarItem-head">{title}</h1>
          <div className="similarItem-rating-cont">
            <BsStarFill className="similarItem-star" />
            <p className="similarItem-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="similarItem-des-cont">
        <h1 className="des-head-similarItem">Description</h1>
        <p className="similarItem-des-para">{jobDescription}</p>
      </div>
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
    </div>
  )
}
export default SimilarItemCard
