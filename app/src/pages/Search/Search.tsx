import React from 'react'
import { useDispatch } from 'react-redux'
import Stylesheet from 'reactjs-stylesheet'
import { setApplications } from '../../redux/interface'
import { ApplicationService } from '../../services/application'
import { SearchService } from '../../services/search'
import { Icon } from '../../typings/d'
import { SearchBar } from './components/SearchBar'
import { Suggestion } from './components/Suggestion'

export const Search = (): React.ReactElement => {
  const [isValid, setIsValid] = React.useState<boolean>(false)
  const [searchInput, setSearchInput] = React.useState<string>('')

  const dispatch = useDispatch()

  /**
   * Alert error
   * TODO: move this error the Alert component
   */
  const alertError = (): void => {
    alert('Something went wrong, please try again')
  }

  /**
   * Handles search update
   * @param value - search value
   */
  const handleUpdateSearch = async (value: string): Promise<void> => {
    const isValid = SearchService.validateUrl(value)
    setIsValid(isValid)
    setSearchInput(value)
  }

  /**
   * Handles new application.
   */
  const handleConfirm = async (): Promise<void> => {
    const success = await ApplicationService.create({ url: searchInput })
    if (!success) {
      alertError()
    }
    await refreshApplications()
  }

  /**
   * Handles new application from suggestions.
   * @param url - service url
   * @param icon - service icon
   */
  const handleSuggestion = async (url: string, icon: Icon): Promise<void> => {
    const success = await ApplicationService.create({ url, icon })
    if (!success) {
      alertError()
    }
    await refreshApplications()
  }

  /**
   * Refreshes applications in state.
   */
  const refreshApplications = async (): Promise<void> => {
    const applications = await ApplicationService.fetch()
    dispatch(setApplications(applications))
  }

  /**
   * Generates result components
   */
  const renderSuggestions = (): React.ReactElement[] => {
    const data = SearchService.getSuggestions()
    return data.map((v, i) => {
      return (
        <Suggestion
          {...v}
          key={`suggestion-${i}`}
          handleSuggestion={handleSuggestion}
        />
      )
    })
  }

  return (
    <div style={styles.container}>
      <SearchBar
        value={searchInput}
        isValid={isValid}
        handleUpdate={handleUpdateSearch}
        handleConfirm={handleConfirm}
      />
      <p className="text-muted align-self-center text-center">
        enter the full url address of the website you wish to add
      </p>

      <h3 className="primary mt-5">Suggestions</h3>
      <div className="d-flex flex-row row justify-content-center">
        {renderSuggestions()}
      </div>
    </div>
  )
}

const styles = Stylesheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '60vw',
    height: '100vh',
    marginTop: '10%',
  },
})
