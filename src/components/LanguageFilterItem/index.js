// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguageDetails, onChangeLanguageItem, activeLanguageId} = props
  const {language, id} = eachLanguageDetails

  const onLanguageItemChange = () => {
    onChangeLanguageItem(id)
  }

  return (
    <li className="each-language">
      <button
        type="button"
        className="language-button"
        onClick={onLanguageItemChange}
        key={activeLanguageId}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
