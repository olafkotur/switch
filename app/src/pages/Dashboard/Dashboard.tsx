import React from 'react'
import { useSelector } from 'react-redux'
import Stylesheet from 'reactjs-stylesheet'
import { RootState } from '../../store'
import { IActionRequest, WebViewAction } from '../../typings/d'
import { IApplicationData } from '../../typings/data'
import { Search } from '../Search/Search'
import { Settings } from '../Settings/Settings'
import { Menu } from './components/Menu'
import { WebView } from './components/WebView'

export type TPages = 'web' | 'search' | 'settings'

export const Dashboard = (): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [page, setPage] = React.useState<TPages>('settings')
  const [selected, setSelected] = React.useState<IApplicationData>()
  const [actionRequest, setActionRequest] = React.useState<IActionRequest>({
    id: '',
    action: '',
  })

  const { settings } = useSelector((state: RootState) => state.user)
  const { applications } = useSelector((state: RootState) => state.interface)

  React.useEffect(() => {
    if (applications) {
      return setLoading(false)
    }
    setLoading(true)
  }, [applications])

  /**
   * Sets the selected application.
   * @param action - target page
   * @param application - app data
   */
  const handleMenuItemClicked = (
    action: TPages,
    application?: IApplicationData,
  ): void => {
    setPage(action)
    action === 'web' && setSelected(application)
  }

  /**
   * Handles action request
   * @param id - menu item id
   * @param action - web view action
   */
  const handleActionRequest = (id: string, action: WebViewAction) => {
    setActionRequest({ id, action })
  }

  if (loading) {
    return <></>
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="bg-secondary"
          style={!settings.overlayMode ? { width: 65 } : {}}
        >
          <Menu
            page={page}
            selected={selected}
            handleClick={handleMenuItemClicked}
            handleActionRequest={handleActionRequest}
          />
        </div>
        <div className="col p-0">
          {/* these must stay as hidden elements to avoid re-rendering */}
          <div className={`${page !== 'web' ? 'd-none' : ''}`}>
            {applications.map((v) => {
              const hidden = !(selected && selected._id === v._id)
              return (
                <div key={v._id} className={`${hidden ? 'd-none' : ''}`}>
                  <WebView
                    id={v._id}
                    url={v.url}
                    hidden={hidden}
                    useModifiedAgent={settings.modifiedAgent}
                    defaultWindowBehaviour={settings.windowBehaviour}
                    actionRequest={actionRequest}
                  />
                </div>
              )
            })}
          </div>

          {page === 'search' && (
            <div
              className="d-flex justify-content-center"
              style={styles.container}
            >
              <Search />
            </div>
          )}

          {page === 'settings' && (
            <div
              className="d-flex justify-content-center"
              style={styles.container}
            >
              <Settings />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = Stylesheet.create({
  container: {
    height: '100vh',
    overflowY: 'scroll',
  },
})
