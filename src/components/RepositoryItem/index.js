// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepositoryItemDetails} = props
  const {
    avatarUrl,
    name,
    issuesCount,
    forksCount,
    starsCount,
  } = eachRepositoryItemDetails

  return (
    <div className="repository-items-container">
      <img src={avatarUrl} alt={name} className="avatar-image" />
      <h1 className="name">{name}</h1>
      <div className="inside-items-container">
        <div className="inside-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="star-image"
          />

          <p className="stars-count">{`${starsCount} stars`}</p>
        </div>
        <div className="inside-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="star-image"
          />
          <p className="forks-count">{`${forksCount} forks`}</p>
        </div>
        <div className="inside-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="star-image"
          />
          <p className="issues-count">{`${issuesCount} open issues`}</p>
        </div>
      </div>
    </div>
  )
}

export default RepositoryItem
