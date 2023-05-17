import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    initialPopularRepos: [],
    isLoading: true,
    activeLanguageId: languageFiltersData[0].id,
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {activeLanguageId} = this.state
    console.log(`ACTIVE LANGUAGE ID:${activeLanguageId}`)

    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`

    const response = await fetch(githubReposApiUrl)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachData => ({
        avatarUrl: eachData.avatar_url,
        name: eachData.name,
        id: eachData.id,
        issuesCount: eachData.issues_count,
        forksCount: eachData.forks_count,
        starsCount: eachData.stars_count,
      }))
      this.setState({
        initialPopularRepos: updatedData,
        isLoading: false,
        apiStatus: apiConstants.success,
      })
    }

    if (response.status === 401) {
      this.setState({isLoading: false, apiStatus: apiConstants.failure})
    }
  }

  onChangeLanguageItem = id => {
    this.setState({activeLanguageId: id}, this.getPopularRepos)
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {initialPopularRepos} = this.state
    console.log(initialPopularRepos)
    return (
      <ul className="repository-tab-container">
        {initialPopularRepos.map(eachRepositoryItem => (
          <RepositoryItem
            key={eachRepositoryItem.id}
            eachRepositoryItemDetails={eachRepositoryItem}
          />
        ))}
      </ul>
    )
  }

  renderRepositoryItems = () => {
    const {apiStatus} = this.state
    console.log(`API STATUS:${apiStatus}`)
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading, apiStatus} = this.state
    console.log(`API STATUS:${apiStatus}`)
    return (
      <div className="github-popular-repos-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="languages-tab-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              eachLanguageDetails={eachLanguage}
              key={eachLanguage.id}
              onChangeLanguageItem={this.onChangeLanguageItem}
            />
          ))}
        </ul>
        <div>
          {isLoading ? this.renderLoader() : this.renderRepositoryItems()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
